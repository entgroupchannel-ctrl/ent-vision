import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddContactDialog = ({ open, onOpenChange, onSuccess }: AddContactDialogProps) => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    company: "",
    line_id: "",
    whatsapp: "",
    callback_time: "",
    category: "",
    source: "",
    priority: "normal",
    notes: "",
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const reset = () =>
    setForm({
      name: "", email: "", message: "", phone: "", company: "",
      line_id: "", whatsapp: "", callback_time: "", category: "",
      source: "", priority: "normal", notes: "",
    });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("กรุณากรอกชื่อ, อีเมล และข้อความ");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      phone: form.phone.trim() || null,
      company: form.company.trim() || null,
      line_id: form.line_id.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      callback_time: form.callback_time.trim() || null,
      category: form.category || null,
      source: form.source || null,
      priority: form.priority || "normal",
      notes: form.notes.trim() || null,
      status: "new",
      created_by: user?.id || null,
    });
    setSaving(false);
    if (error) {
      toast.error("บันทึกไม่สำเร็จ: " + error.message);
      return;
    }
    toast.success("เพิ่มข้อมูลติดต่อเรียบร้อย");
    reset();
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>เพิ่มข้อมูลติดต่อ</DialogTitle>
          <DialogDescription>กรอกข้อมูลลูกค้าหรือผู้ติดต่อเข้ามาใหม่</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {/* name */}
          <div className="space-y-1.5">
            <Label>ชื่อ-นามสกุล <span className="text-destructive">*</span></Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="ชื่อ นามสกุล" />
          </div>
          {/* email */}
          <div className="space-y-1.5">
            <Label>อีเมล <span className="text-destructive">*</span></Label>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" />
          </div>
          {/* phone */}
          <div className="space-y-1.5">
            <Label>โทรศัพท์</Label>
            <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0xx-xxx-xxxx" />
          </div>
          {/* company */}
          <div className="space-y-1.5">
            <Label>บริษัท</Label>
            <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="ชื่อบริษัท" />
          </div>
          {/* line_id */}
          <div className="space-y-1.5">
            <Label>LINE ID</Label>
            <Input value={form.line_id} onChange={(e) => set("line_id", e.target.value)} placeholder="@lineid" />
          </div>
          {/* whatsapp */}
          <div className="space-y-1.5">
            <Label>WhatsApp</Label>
            <Input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+66xxxxxxxxx" />
          </div>
          {/* callback_time */}
          <div className="space-y-1.5">
            <Label>เวลาที่สะดวกติดต่อกลับ</Label>
            <Input value={form.callback_time} onChange={(e) => set("callback_time", e.target.value)} placeholder="เช่น จ-ศ 9:00-17:00" />
          </div>
          {/* category */}
          <div className="space-y-1.5">
            <Label>หมวดหมู่</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger><SelectValue placeholder="เลือกหมวดหมู่" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="สอบถามสินค้า">สอบถามสินค้า</SelectItem>
                <SelectItem value="ขอใบเสนอราคา">ขอใบเสนอราคา</SelectItem>
                <SelectItem value="บริการหลังการขาย">บริการหลังการขาย</SelectItem>
                <SelectItem value="ร่วมงาน/ตัวแทนจำหน่าย">ร่วมงาน/ตัวแทนจำหน่าย</SelectItem>
                <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* source */}
          <div className="space-y-1.5">
            <Label>แหล่งที่มา</Label>
            <Select value={form.source} onValueChange={(v) => set("source", v)}>
              <SelectTrigger><SelectValue placeholder="เลือกแหล่งที่มา" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="โทรศัพท์">โทรศัพท์</SelectItem>
                <SelectItem value="walk_in">Walk-in</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="งานแสดงสินค้า">งานแสดงสินค้า</SelectItem>
                <SelectItem value="แนะนำจากลูกค้า">แนะนำจากลูกค้า</SelectItem>
                <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* priority */}
          <div className="space-y-1.5">
            <Label>ความเร่งด่วน</Label>
            <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="normal">ปกติ</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
                <SelectItem value="urgent">เร่งด่วน</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* message */}
          <div className="space-y-1.5 md:col-span-2">
            <Label>ข้อความ/รายละเอียด <span className="text-destructive">*</span></Label>
            <Textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="รายละเอียดการติดต่อ" rows={3} />
          </div>
          {/* notes */}
          <div className="space-y-1.5 md:col-span-2">
            <Label>บันทึกภายใน (Admin)</Label>
            <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="โน้ตสำหรับทีมงาน" rows={2} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-accent transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
