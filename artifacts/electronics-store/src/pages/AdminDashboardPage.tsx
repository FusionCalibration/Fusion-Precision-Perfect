
import { useLocation } from "wouter";
import { useAdminAuth } from "../auth/AdminAuthContext";
import AdminProducts from "../components/AdminProducts";

export default function AdminDashboardPage() {
  const { admin, logout } = useAdminAuth();
  const [, navigate] = useLocation();

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  if (!admin) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Fusion Precision Perfect
            </p>
            <h1 className="text-xl font-bold text-slate-900">
              Admin portal
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-sm text-slate-500">
            Signed in as {admin.email}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {admin.welcomeMessage?.trim() || `Welcome, ${admin.name}.`}
          </h2>

          <p className="mt-3 text-slate-600">
            Manage your website products and business enquiries from here.
          </p>
        </section>

        <AdminProducts />
      </div>
    </main>
  );
}
