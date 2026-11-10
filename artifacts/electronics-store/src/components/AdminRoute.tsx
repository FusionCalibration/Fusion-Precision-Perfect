import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "../auth/AdminAuthContext";
import AdminDashboardPage from "../pages/AdminDashboardPage";

export default function AdminRoute() {
  const { admin, loading } = useAdminAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !admin) navigate("/admin/login");
  }, [admin, loading, navigate]);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">Checking administrator session…</main>;
  }

  if (!admin) return null;
  return <AdminDashboardPage />;
}
