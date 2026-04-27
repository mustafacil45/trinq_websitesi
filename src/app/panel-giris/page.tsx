"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export default function PanelGirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Giriş başarısız.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-neutral-900">
      {/* Sol: form — sadece bu sayfa için siyah-beyaz */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 lg:py-0 bg-[#FAFAFA] border-b lg:border-b-0 lg:border-r border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-md mx-auto w-full"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-900 hover:text-neutral-600 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          <div className="mb-10">
            <img
              src="/trinq-logo.png"
              alt="trinQ"
              className="h-8 w-auto object-contain mb-8 grayscale"
            />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              İşletme Paneli
            </h1>
            <p className="text-neutral-600 leading-relaxed">
              trinQ panelinize giriş yaparak kampanyalarınızı ve satışlarınızı anlık olarak yönetin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error ? (
              <p className="text-sm text-neutral-800 bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2">
                {error}
              </p>
            ) : null}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-800">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trinq.app"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-neutral-800">
                  Şifre
                </label>
                <a
                  href="mailto:destek@trinq.app?subject=Şifre%20sıfırlama"
                  className="text-xs text-neutral-900 underline-offset-2 hover:underline"
                >
                  Şifremi Unuttum
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600 cursor-pointer">
                Beni hatırla
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-neutral-900 text-white font-semibold tracking-wide hover:bg-neutral-800 disabled:opacity-60 disabled:pointer-events-none transition-colors shadow-sm"
            >
              {loading ? "Giriş yapılıyor…" : "GİRİŞ YAP"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-600">
            Henüz üye değil misiniz?{" "}
            <Link href="/#iletisim" className="text-neutral-900 font-medium underline-offset-2 hover:underline">
              Bize Ulaşın
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Sağ: sadece gri tonlar — site ana renklerine dokunulmaz */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-neutral-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 w-full max-w-lg px-12"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Günlük Ciro
                </p>
                <p className="text-4xl font-bold text-neutral-900 tracking-tight">₺12,450</p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center gap-1">
                <span>+24%</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-32 mb-8 px-2">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                  className="flex-1 bg-neutral-900 rounded-t-md opacity-90"
                  style={{ maxWidth: "2rem" }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex -space-x-3">
                {["M", "A", "C", "E", "K"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-neutral-800 bg-neutral-100 px-3 py-1.5 rounded-lg">
                +1.2K
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-4 w-20 h-20 bg-white rounded-2xl shadow-lg border border-neutral-200 flex items-center justify-center"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -left-8 w-16 h-16 bg-neutral-900 rounded-2xl shadow-lg flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
