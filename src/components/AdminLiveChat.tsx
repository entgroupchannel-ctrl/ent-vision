import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Headphones, Send, User, Clock, CheckCircle, XCircle,
  RefreshCw, MessageSquare, Loader2, Search, ArrowLeft,
} from "lucide-react";

type Conversation = {
  id: string;
  guest_name: string | null;
  guest_email: string | null;
  user_id: string | null;
  status: string;
  assigned_admin: string | null;
  last_message_at: string;
  created_at: string;
  unread_count?: number;
};

type Message = {
  id: string;
  sender_type: "user" | "admin" | "system";
  content: string;
  created_at: string;
  read: boolean;
};

const AdminLiveChat = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ─── React Query: conversations + unread counts ───
   * Auto-refetches on window focus (fixes spinner stuck after tab switch).
   * Realtime channel below invalidates the cache when new conversations arrive.
   */
  const { data: conversations = [], isLoading: loading } = useQuery({
    queryKey: ["admin", "live-chat-conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_chat_conversations")
        .select("*")
        .order("last_message_at", { ascending: false });
      if (error) throw error;
      if (!data) return [] as Conversation[];

      // Count unread messages per conversation
      const convIds = data.map((c: any) => c.id);
      let unreadMap: Record<string, number> = {};
      if (convIds.length > 0) {
        const { data: unreadData } = await supabase
          .from("live_chat_messages")
          .select("conversation_id")
          .in("conversation_id", convIds)
          .eq("sender_type", "user")
          .eq("read", false);
        unreadData?.forEach((m: any) => {
          unreadMap[m.conversation_id] = (unreadMap[m.conversation_id] || 0) + 1;
        });
      }

      return data.map((c: any) => ({ ...c, unread_count: unreadMap[c.id] || 0 })) as Conversation[];
    },
  });

  // Helper to refetch — used by realtime channel and any save handlers
  const loadConversations = () => {
    qc.invalidateQueries({ queryKey: ["admin", "live-chat-conversations"] });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Visibility Change Handler: Reconnect realtime + refetch when tab returns
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    let lastHiddenTime: number | null = null;
    const STALE_THRESHOLD = 30 * 1000; // 30 seconds

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastHiddenTime = Date.now();
      } else {
        const hiddenDuration = lastHiddenTime ? Date.now() - lastHiddenTime : 0;
        
        if (hiddenDuration >= STALE_THRESHOLD) {
          console.log('[AdminLiveChat] Tab returned after', Math.round(hiddenDuration / 1000), 's — refreshing...');
          
          // Refetch conversations
          loadConversations();
          
          // Reload messages for selected conversation
          if (selectedConv) {
            (async () => {
              const { data } = await supabase
                .from("live_chat_messages")
                .select("*")
                .eq("conversation_id", selectedConv.id)
                .order("created_at", { ascending: true });
              if (data) setMessages(data as Message[]);
            })();
          }
        }
        
        lastHiddenTime = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [selectedConv?.id, qc]);

  // Realtime for new conversations
  useEffect(() => {
    const channel = supabase
      .channel("admin-live-chat-convs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "live_chat_conversations" },
        () => { loadConversations(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConv) return;
    const load = async () => {
      console.log('[AdminLiveChat] Loading messages for:', selectedConv.id);
      const { data, error } = await supabase
        .from("live_chat_messages")
        .select("*")
        .eq("conversation_id", selectedConv.id)
        .order("created_at", { ascending: true });
      
      if (error) {
        console.error('[AdminLiveChat] Error loading messages:', error);
        return;
      }
      
      console.log('[AdminLiveChat] Loaded messages:', data?.length || 0);
      if (data) setMessages(data as Message[]);

      // Mark user messages as read
      await supabase
        .from("live_chat_messages")
        .update({ read: true })
        .eq("conversation_id", selectedConv.id)
        .eq("sender_type", "user")
        .eq("read", false);
    };
    load();
  }, [selectedConv?.id]);

  // Realtime for messages in selected conversation
  useEffect(() => {
    if (!selectedConv) return;
    const channel = supabase
      .channel(`admin-chat-msg-${selectedConv.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "live_chat_messages",
          filter: `conversation_id=eq.${selectedConv.id}`,
        },
        (payload) => {
          const msg = payload.new as any;
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          // Auto-mark as read if admin
          if (msg.sender_type === "user") {
            supabase
              .from("live_chat_messages")
              .update({ read: true })
              .eq("id", msg.id);
          }
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedConv?.id]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending || !selectedConv || !user) return;
    setSending(true);
    setInput("");

    await supabase.from("live_chat_messages").insert({
      conversation_id: selectedConv.id,
      sender_type: "admin",
      sender_id: user.id,
      content: text,
    });

    await supabase
      .from("live_chat_conversations")
      .update({ last_message_at: new Date().toISOString(), assigned_admin: user.id })
      .eq("id", selectedConv.id);

    setSending(false);
  };

  const closeConversation = async (convId: string) => {
    await supabase
      .from("live_chat_conversations")
      .update({ status: "closed" })
      .eq("id", convId);

    await supabase.from("live_chat_messages").insert({
      conversation_id: convId,
      sender_type: "system",
      content: "แอดมินปิดการสนทนาแล้ว ขอบคุณที่ติดต่อเราครับ/ค่ะ 🙏",
    });

    if (selectedConv?.id === convId) setSelectedConv(null);
    loadConversations();
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60000) return "เมื่อสักครู่";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} นาที`;
    if (diff < 86400000) return d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
  };

  const filteredConvs = conversations.filter((c) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      c.guest_name?.toLowerCase().includes(s) ||
      c.guest_email?.toLowerCase().includes(s)
    );
  });

  const activeConvs = filteredConvs.filter((c) => c.status === "active");
  const closedConvs = filteredConvs.filter((c) => c.status === "closed");

  return (
    <div className="h-[calc(100vh-200px)] min-h-[500px] flex border border-border rounded-xl overflow-hidden bg-background">
      {/* Conversation List */}
      <div className={`w-full md:w-80 border-r border-border flex flex-col ${selectedConv ? "hidden md:flex" : "flex"}`}>
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Headphones size={16} className="text-primary" /> Live Chat
              {activeConvs.length > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {activeConvs.length}
                </span>
              )}
            </h3>
            <button onClick={loadConversations} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อ/อีเมล..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeConvs.length === 0 && closedConvs.length === 0 && !loading && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">ยังไม่มีการสนทนา</p>
            </div>
          )}

          {activeConvs.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-muted-foreground px-3 pt-2 pb-1 uppercase">กำลังสนทนา</p>
              {activeConvs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConv(c)}
                  className={`w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors border-b border-border/50 ${
                    selectedConv?.id === c.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{c.guest_name || "ผู้เยี่ยมชม"}</span>
                    {(c.unread_count || 0) > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {c.unread_count}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-muted-foreground truncate">{c.guest_email}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock size={10} /> {formatTime(c.last_message_at)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {closedConvs.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-muted-foreground px-3 pt-3 pb-1 uppercase">ปิดแล้ว</p>
              {closedConvs.slice(0, 10).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConv(c)}
                  className={`w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors border-b border-border/50 opacity-60 ${
                    selectedConv?.id === c.id ? "bg-primary/5 opacity-100" : ""
                  }`}
                >
                  <span className="text-xs text-foreground truncate block">{c.guest_name || "ผู้เยี่ยมชม"}</span>
                  <span className="text-[10px] text-muted-foreground">{c.guest_email}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedConv ? "hidden md:flex" : "flex"}`}>
        {!selectedConv ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Headphones size={48} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">เลือกการสนทนาเพื่อเริ่มตอบ</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConv(null)}
                  className="md:hidden p-1 rounded-lg hover:bg-muted"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{selectedConv.guest_name || "ผู้เยี่ยมชม"}</p>
                  <p className="text-[11px] text-muted-foreground">{selectedConv.guest_email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedConv.status === "active" && (
                  <button
                    onClick={() => closeConversation(selectedConv.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors flex items-center gap-1"
                  >
                    <XCircle size={12} /> ปิดสนทนา
                  </button>
                )}
                {selectedConv.status === "closed" && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle size={12} /> ปิดแล้ว
                  </span>
                )}
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => {
                if (msg.sender_type === "system") {
                  return (
                    <div key={msg.id} className="text-center">
                      <span className="inline-block text-[11px] text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {msg.content}
                      </span>
                    </div>
                  );
                }
                const isAdmin = msg.sender_type === "admin";
                return (
                  <div key={msg.id} className={`flex gap-2 ${isAdmin ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isAdmin ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}>
                      {isAdmin ? <Headphones size={14} /> : <User size={14} />}
                    </div>
                    <div className="max-w-[75%]">
                      <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isAdmin
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}>
                        {msg.content}
                      </div>
                      <span className={`text-[10px] text-muted-foreground mt-0.5 block ${isAdmin ? "text-right" : ""}`}>
                        {new Date(msg.created_at).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            {selectedConv.status === "active" && (
              <div className="border-t border-border px-3 py-2.5 bg-card">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="พิมพ์ข้อความตอบกลับ..."
                    rows={1}
                    className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-24"
                    style={{ minHeight: "38px" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || sending}
                    className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLiveChat;
