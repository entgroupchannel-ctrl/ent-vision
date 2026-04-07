import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContext {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContext>({
  user: null, session: null, isAdmin: false, isSuperAdmin: false, loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const initDoneRef = useRef(false);
  const checkingRolesRef = useRef(false);

  const checkRoles = async (userId: string) => {
    if (checkingRolesRef.current) return;
    checkingRolesRef.current = true;
    try {
      const [adminRes, superRes] = await Promise.all([
        supabase.rpc("is_admin", { _user_id: userId }).then(
          (r) => r,
          () => ({ data: null })
        ),
        supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }).then(
          (r) => r,
          () => ({ data: null })
        ),
      ]);
      if (adminRes.data !== null) setIsAdmin(adminRes.data === true);
      if (superRes.data !== null) setIsSuperAdmin(superRes.data === true);
    } catch {
      // On error preserve existing state - don't reset to false
    }
    checkingRolesRef.current = false;
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkRoles(session.user.id);
        }
      } catch (e) {
        console.error("useAuth init error:", e);
      } finally {
        if (mounted) {
          initDoneRef.current = true;
          setLoading(false);
        }
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;
      if (!initDoneRef.current) return;

      // Always update session reference (it changes on token refresh)
      setSession(newSession);

      // CRITICAL: Only update user state if user.id actually changed.
      // This prevents downstream re-renders during TOKEN_REFRESHED events.
      const newUserId = newSession?.user?.id ?? null;
      setUser((prev) => {
        const prevId = prev?.id ?? null;
        if (prevId === newUserId) {
          // Same user — keep the same reference to prevent useEffect cascades
          return prev;
        }
        return newSession?.user ?? null;
      });

      // TOKEN_REFRESHED: never re-check roles or trigger downstream effects
      if (event === "TOKEN_REFRESHED") {
        return;
      }

      if (event === "SIGNED_OUT") {
        setIsAdmin(false);
        setIsSuperAdmin(false);
        return;
      }

      if (newSession?.user) {
        if (event === "SIGNED_IN") {
          await checkRoles(newSession.user.id);
        }
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    window.location.replace(window.location.origin + "/admin-login");
  };

  return (
    <AuthCtx.Provider value={{ user, session, isAdmin, isSuperAdmin, loading, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
};
