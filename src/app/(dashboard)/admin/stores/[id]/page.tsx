"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { value: "cafe", label: "Kafe" },
  { value: "restaurant", label: "Restoran" },
  { value: "bakery", label: "Fırın" },
  { value: "market", label: "Market" },
  { value: "other", label: "Diğer" },
];

export default function StoreEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    name: "", slug: "", description: "", address: "", city: "İstanbul",
    phone: "", email: "", category: "cafe", isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/stores/${id}`).then((r) => r.json()).then((data) => {
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "İstanbul",
          phone: data.phone || "",
          email: data.email || "",
          category: data.category || "cafe",
          isActive: data.isActive ?? true,
        });
      });
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isNew ? "/api/stores" : `/api/stores/${id}`;
    const method = isNew ? "POST" : "PUT";

    const body = isNew
      ? { ...form, ownerId: "temp-" + Date.now(), slug: form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }
      : form;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    router.push("/admin/stores");
  };

  const Field = ({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">{label}</label>
      <input
        type={type}
        value={form[name as keyof typeof form] as string}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
        required={required}
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/stores" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition">
        <ArrowLeft size={16} /> Mağazalara Dön
      </Link>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-slate-800">{isNew ? "Yeni Mağaza Oluştur" : "Mağaza Düzenle"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mağaza Adı" name="name" required />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              >
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <Field label="Adres" name="address" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Şehir" name="city" />
            <Field label="Telefon" name="phone" />
          </div>
          <Field label="E-posta" name="email" type="email" />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Açıklama</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-black"
            />
            <label className="text-sm text-slate-600">Mağaza Aktif</label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800 disabled:opacity-60"
          >
            <Save size={18} /> {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
