"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Tag } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  type: string;
  discount: number;
  discountType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit: number | null;
  store: { name: string };
}

const TYPE_LABELS: Record<string, string> = {
  general: "Genel",
  student: "Öğrenci",
  welcome: "Hoş Geldin",
  birthday: "Doğum Günü",
};
const TYPE_COLORS: Record<string, string> = {
  general: "bg-slate-100 text-black",
  student: "bg-slate-100 text-black",
  welcome: "bg-slate-100 text-black",
  birthday: "bg-slate-100 text-black",
};

function wizardTypeLabel(type: string) {
  if (type.startsWith("wizard_")) return "Sihirbaz";
  return TYPE_LABELS[type] || type;
}

function wizardTypeColor(type: string) {
  if (type.startsWith("wizard_")) return "border border-slate-200 bg-slate-100 font-bold text-black";
  return TYPE_COLORS[type] || "bg-slate-100 text-slate-600";
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  const filtered = campaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Kampanyayı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/campaigns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !isActive } : c)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kampanya ara..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black/10"
          />
        </div>
        <Link
          href="/admin/campaigns/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800"
        >
          <Plus size={18} /> Yeni Kampanya Sihirbazı
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${wizardTypeColor(c.type)}`}
              >
                {wizardTypeLabel(c.type)}
              </span>
              <button
                type="button"
                onClick={() => toggleActive(c.id, c.isActive)}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  c.isActive ? "bg-slate-100 text-black" : "bg-slate-100 text-slate-700"
                }`}
              >
                {c.isActive ? "Aktif" : "Pasif"}
              </button>
            </div>
            <h3 className="text-sm font-bold text-slate-800">{c.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">{c.description}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
              <Tag size={12} />
              <span className="font-bold text-black">
                {c.discountType === "percent" ? `%${c.discount}` : `₺${c.discount}`} indirim
              </span>
              <span>·</span>
              <span>{c.usageCount} kullanım</span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">{c.store.name}</p>
            <div className="mt-3 flex items-center justify-end border-t border-slate-50 pt-3">
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-400">Kampanya bulunamadı.</p>
      )}
    </div>
  );
}
