import { useState, useEffect } from "react";
import {
  Users, Plus, Shield, Edit3, Save, Loader2, RefreshCw,
  Check, X, Eye, Pencil, Ban, ChevronDown,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  PERMISSION_KEYS, PERMISSION_LABELS, PERMISSION_GROUPS,
  PRESETS, type PermissionKey, type AccessLevel,
} from "@/hooks/usePermissions";

interface AdminUser {
  user_id: string;
  role: string;
  email: string;
  created_at: string;
  permissions: Record<string, string>;
}

const ACCESS_ICONS: Record<AccessLevel, { icon: typeof Eye; label: string; color: string }> = {
  edit: { icon: Pencil, label: "แก้ไขได้", color: "text-green-500 bg-green-500/10 border-green-500/20" },
  view: { icon: Eye, label: "ดูได้", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  none: { icon: Ban, label: "ไม่มีสิทธิ์", color: "text-muted-foreground bg-muted border-border" },
};

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const AdminUserManagement = () => {
  const { user, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editPerms, setEditPerms] = useState<Record<PermissionKey, AccessLevel>>({} as any);
  const [saving, setSaving] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState<"admin" | "moderator">("admin");
  const [addPreset, setAddPreset] = useState("sales_staff");
  const [adding, setAdding] = useState(false);

  const fetchAdminUsers = async () => {
    setLoading(true);
    try {
      const { data: roles } = await (supabase.from as any)("user_roles")
        .select("user_id, role, created_at")
        .in("role", ["super_admin", "admin", "moderator"])
        .order("created_at", { ascending: false });

      if (!roles) { setLoading(false); return; }

      const userIds = roles.map((r: any) => r.user_id);
      const { data: perms } = await (supabase.from as any)("admin_permissions")
        .select("user_id, permission_key, access_level")
        .in("user_id", userIds);

      const usersMap: Record<string, AdminUser> = {};
      for (const r of roles) {
        usersMap[r.user_id] = {
          user_id: r.user_id,
          role: r.role,
          email: "",
          created_at: r.created_at,
          permissions: {},
        };
      }

      if (perms) {
        for (const p of perms) {
          if (usersMap[p.user_id]) {
            usersMap[p.user_id].permissions[p.permission_key] = p.access_level;
          }
        }
      }

      const { data: profiles } = await (supabase.from as any)("profiles")
        .select("id, full_name")
        .in("id", userIds);

      for (const uid of userIds) {
        if (usersMap[uid]) {
          const profile = profiles?.find((p: any) => p.id === uid);
          usersMap[uid].email = profile?.full_name || `User ${uid.slice(0, 8)}...`;
        }
      }

      setAdminUsers(Object.values(usersMap));
    } catch (err) {
      console.error("Failed to fetch admin users:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAdminUsers(); }, []);

  const selectUser = (u: AdminUser) => {
    setSelectedUser(u);
    const perms: Record<PermissionKey, AccessLevel> = {} as any;
    for (const key of PERMISSION_KEYS) {
      perms[key] = (u.permissions[key] as AccessLevel) || (u.role === "super_admin" ? "edit" : "none");
    }
    setEditPerms(perms);
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS[presetId];
    if (preset) {
      setEditPerms({ ...preset.permissions });
    }
  };

  const togglePermission = (key: PermissionKey) => {
    setEditPerms((prev) => {
      const current = prev[key];
      const next: AccessLevel = current === "none" ? "view" : current === "view" ? "edit" : "none";
      return { ...prev, [key]: next };
    });
  };

  const handleSavePermissions = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await (supabase.from as any)("admin_permissions")
        .delete()
        .eq("user_id", selectedUser.user_id);

      const inserts = PERMISSION_KEYS.map((key) => ({
        user_id: selectedUser.user_id,
        permission_key: key,
        access_level: editPerms[key] || "none",
      }));

      const { error } = await (supabase.from as any)("admin_permissions").insert(inserts);
      if (error) throw error;

      toast({ title: "บันทึกสิทธิ์สำเร็จ" });
      fetchAdminUsers();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleAddUser = async () => {
    if (!addEmail) {
      toast({ title: "กรุณากรอก User ID", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      if (addEmail.includes("@")) {
        toast({
          title: "กรุณาใช้ User ID (UUID)",
          description: "ค้นหา user_id ได้จาก Supabase Dashboard → Authentication → Users",
          variant: "destructive",
        });
        setAdding(false);
        return;
      }

      const { error: roleError } = await (supabase.from as any)("user_roles").insert({
        user_id: addEmail,
        role: addRole,
      });

      if (roleError) throw roleError;

      const preset = PRESETS[addPreset];
      if (preset) {
        const inserts = PERMISSION_KEYS.map((key) => ({
          user_id: addEmail,
          permission_key: key,
          access_level: preset.permissions[key],
        }));
        await (supabase.from as any)("admin_permissions").insert(inserts).catch(() => {});
      }

      toast({ title: "เพิ่ม Admin สำเร็จ" });
      setShowAddForm(false);
      setAddEmail("");
      fetchAdminUsers();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const roleColors: Record<string, string> = {
    super_admin: "bg-primary/10 text-primary border-primary/20",
    admin: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    moderator: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  const roleLabels: Record<string, string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    moderator: "Moderator",
  };

  if (!isSuperAdmin) {
    return (
      <div className="card-surface rounded-xl p-10 text-center text-sm text-muted-foreground">
        <Shield size={32} className="mx-auto mb-3 opacity-20" />
        <p>เฉพาะ Super Admin เท่านั้นที่จัดการผู้ใช้ได้</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Users size={18} className="text-primary" /> จัดการผู้ใช้ Admin ({adminUsers.length})
        </h3>
        <div className="flex gap-2">
          <button onClick={fetchAdminUsers} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Plus size={14} /> เพิ่ม Admin
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="card-surface rounded-xl p-5 space-y-3 animate-fade-in">
          <h4 className="text-sm font-bold text-foreground">เพิ่ม Admin ใหม่</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">User ID (UUID)</label>
              <input
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                className={inputClass}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground mt-1">ค้นหา user_id ได้จาก Supabase Dashboard</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">บทบาท</label>
              <select value={addRole} onChange={(e) => setAddRole(e.target.value as any)} className={inputClass}>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">ชุดสิทธิ์เริ่มต้น</label>
              <select value={addPreset} onChange={(e) => setAddPreset(e.target.value)} className={inputClass}>
                {Object.entries(PRESETS).map(([id, preset]) => (
                  <option key={id} value={id}>{preset.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddUser} disabled={adding} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-60">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              เพิ่ม
            </button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground">
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={20} className="animate-spin text-muted-foreground" />
            </div>
          ) : adminUsers.length === 0 ? (
            <div className="card-surface rounded-xl p-10 text-center text-sm text-muted-foreground">ไม่มี Admin ในระบบ</div>
          ) : (
            adminUsers.map((u) => {
              const isSelected = selectedUser?.user_id === u.user_id;
              const editCount = Object.values(u.permissions).filter((v) => v === "edit").length;
              const viewCount = Object.values(u.permissions).filter((v) => v === "view").length;
              return (
                <button
                  key={u.user_id}
                  onClick={() => selectUser(u)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-foreground">{u.email}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${roleColors[u.role] || roleColors.admin}`}>
                      {roleLabels[u.role] || u.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Pencil size={10} /> {editCount} edit</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {viewCount} view</span>
                    <span>{new Date(u.created_at).toLocaleDateString("th-TH")}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="lg:col-span-3">
          {selectedUser ? (
            <div className="card-surface rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-foreground">{selectedUser.email}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${roleColors[selectedUser.role] || roleColors.admin}`}>
                    {roleLabels[selectedUser.role] || selectedUser.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => applyPreset(e.target.value)}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    defaultValue=""
                  >
                    <option value="" disabled>ใช้ชุดสิทธิ์สำเร็จรูป...</option>
                    {Object.entries(PRESETS).map(([id, preset]) => (
                      <option key={id} value={id}>{preset.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {PERMISSION_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50 mb-2">{group.label}</p>
                    <div className="space-y-1.5">
                      {group.keys.map((key) => {
                        const level = editPerms[key] || "none";
                        const config = ACCESS_ICONS[level];
                        const Icon = config.icon;
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors"
                          >
                            <div>
                              <span className="text-sm font-medium text-foreground">{PERMISSION_LABELS[key]}</span>
                              <span className="text-xs text-muted-foreground ml-2">{key}</span>
                            </div>
                            <button
                              onClick={() => togglePermission(key)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${config.color}`}
                              title="คลิกเพื่อเปลี่ยนระดับสิทธิ์"
                            >
                              <Icon size={12} /> {config.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                {(["edit", "view", "none"] as AccessLevel[]).map((level) => {
                  const config = ACCESS_ICONS[level];
                  const Icon = config.icon;
                  return (
                    <span key={level} className={`flex items-center gap-1 text-xs ${config.color} px-2 py-1 rounded-lg border`}>
                      <Icon size={10} /> {config.label}
                    </span>
                  );
                })}
              </div>

              {/* Save button */}
              <div className="mt-4">
                <button
                  onClick={handleSavePermissions}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  บันทึกสิทธิ์
                </button>
              </div>
            </div>
          ) : (
            <div className="card-surface rounded-xl p-10 text-center text-sm text-muted-foreground">
              <Shield size={32} className="mx-auto mb-3 opacity-20" />
              <p>เลือกผู้ใช้เพื่อจัดการสิทธิ์</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
