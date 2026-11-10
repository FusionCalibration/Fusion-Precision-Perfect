import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { customFetch } from "@workspace/api-client-react";

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  welcomeMessage: string | null;
};

type AuthContextValue = {
  admin: AdminUser | null;
  loading: boolean;
  refresh: () => Promise<AdminUser | null>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const result = await customFetch<{ admin: AdminUser }>("/api/auth/me", {
        responseType: "json",
      });
      setAdmin(result.admin);
      return result.admin;
    } catch {
      setAdmin(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await customFetch("/api/auth/logout", {
        method: "POST",
        responseType: "auto",
      });
    } finally {
      setAdmin(null);
    }
  }, []);

  const value = useMemo(() => ({ admin, loading, refresh, logout }), [admin, loading, refresh, logout]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return context;
}
