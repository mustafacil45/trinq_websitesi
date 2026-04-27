"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş başarısız.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 font-[family-name:var(--font-inter),sans-serif]">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black tracking-tight text-black shadow-sm">
            tQ
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black">trinQ İşletme</h1>
          <p className="mt-1 text-sm text-slate-500">Yönetim paneline giriş</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                E-posta
              </label>
              <div className="relative">
                <Mail size={18} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trinq.app"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black/10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Şifre
              </label>
              <div className="relative">
                <Lock size={18} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                  aria-label={showPw ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPw ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-black py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Giriş yap"
            )}
          </button>

          <p className="mt-5 text-center text-[11px] text-slate-500">
            Demo: admin@trinq.app / trinq2025
          </p>
        </form>
      </div>
    </div>
  );
}
