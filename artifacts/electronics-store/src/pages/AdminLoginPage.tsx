import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { customFetch } from "@workspace/api-client-react";
import { useAdminAuth } from "../auth/AdminAuthContext";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (element: HTMLElement, options: Record<string, string | number | boolean>) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = "google-identity-services";

export default function AdminLoginPage() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading secure sign-in…");
  const [busy, setBusy] = useState(false);
  const [, navigate] = useLocation();
  const { refresh } = useAdminAuth();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId) {
      setStatus("Google sign-in is not configured. Contact the system owner.");
      return;
    }

    let cancelled = false;
    const initialize = () => {
      if (cancelled || !window.google || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          if (busy) return;
          setBusy(true);
          setStatus("Verifying your administrator account…");
          try {
            await customFetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential }),
              responseType: "json",
            });
            const admin = await refresh();
            if (!admin) throw new Error("Your administrator session could not be established.");
            navigate("/admin");
          } catch (error) {
            setStatus(error instanceof Error ? error.message : "Sign-in failed. Please try again.");
          } finally {
            setBusy(false);
          }
        },
        cancel_on_tap_outside: true,
      });
      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "signin_with",
        width: 300,
      });
      setStatus("Sign in with an authorised Google account.");
    };

    let script = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
    if (window.google) {
      initialize();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = GOOGLE_SCRIPT_ID;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", initialize);
      script.addEventListener("error", () => setStatus("Google sign-in could not load. Check your connection and retry."));
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initialize);
    };
  }, [clientId, navigate, refresh]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link href="/" className="text-sm text-amber-400 hover:text-amber-300">← Back to website</Link>
        <div className="mt-8 mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Fusion Precision Perfect</p>
          <h1 className="mt-3 text-3xl font-bold">Administrator sign in</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            This area is restricted to approved administrators. Use the Google account registered by the system owner.
          </p>
        </div>
        <div className="min-h-12 flex justify-center">
          <div ref={buttonRef} />
        </div>
        {busy && <p className="mt-5 text-center text-sm text-amber-300">Verifying account…</p>}
        <p role="status" aria-live="polite" className="mt-5 text-center text-sm text-slate-400">{status}</p>
        <p className="mt-8 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-500">
          Sign-in does not create an administrator account. Access is granted only to accounts already authorised on the server.
        </p>
      </section>
    </main>
  );
}
