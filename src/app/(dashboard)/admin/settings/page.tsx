"use client";

import { useState } from "react";
import { Save, User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: "trinQ Admin", email: "admin@trinq.app" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [saved, setSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Success Toast */}
      {saved && (
        <div className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-black">
          Ayarlar başarıyla kaydedildi!
        </div>
      )}

      {/* Profile */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-black">
            <User size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Profil Bilgileri</h2>
        </div>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Ad Soyad</label>
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">E-posta</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
            </div>
          </div>
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-sm">
            <Save size={16} /> Profili Kaydet
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-black">
            <Lock size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Şifre Değiştir</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Mevcut Şifre</label>
            <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Yeni Şifre</label>
              <input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Şifre Tekrar</label>
              <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700">
            <Lock size={16} /> Şifreyi Güncelle
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-black">
            <Bell size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Bildirim Tercihleri</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Yeni işlem bildirimi", desc: "Her yeni satışta e-posta al" },
            { label: "Kampanya sona erme uyarısı", desc: "Kampanya bitmeden 3 gün önce" },
            { label: "Haftalık rapor", desc: "Her pazartesi performans özeti" },
          ].map((item) => (
            <label key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-black focus:ring-black" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
