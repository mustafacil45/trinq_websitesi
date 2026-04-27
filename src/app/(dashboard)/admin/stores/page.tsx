"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, MapPin, Trash2, Pencil } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  category: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  _count: { campaigns: number; stamps: number; transactions: number };
}

const CAT_LABELS: Record<string, string> = {
  cafe: "Kafe",
  restaurant: "Restoran",
  bakery: "Fırın",
  market: "Market",
  other: "Diğer",
};

export default function StoresPage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/stores").then((r) => r.json()).then(setStores).finally(() => setLoading(false));
  }, []);

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Bu mağazayı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/stores/${id}`, { method: "DELETE" });
    setStores((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/stores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setStores((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !isActive } : s)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mağaza ara..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>
        <Link
          href="/admin/stores/new"
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800"
        >
          <Plus size={18} /> Yeni Mağaza
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3.5">Mağaza Adı</th>
              <th className="px-5 py-3.5">Kategori</th>
              <th className="px-5 py-3.5">Adres</th>
              <th className="px-5 py-3.5 text-center">Kampanya</th>
              <th className="px-5 py-3.5 text-center">İşlem</th>
              <th className="px-5 py-3.5 text-center">Durum</th>
              <th className="px-5 py-3.5 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((store) => (
              <tr key={store.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-black">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">{store.name}</p>
                      <p className="text-[11px] text-slate-400">{store.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {CAT_LABELS[store.category] || store.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500 max-w-[200px] truncate">{store.address}</td>
                <td className="px-5 py-3.5 text-center font-bold text-slate-600">{store._count.campaigns}</td>
                <td className="px-5 py-3.5 text-center font-bold text-slate-600">{store._count.transactions}</td>
                <td className="px-5 py-3.5 text-center">
                  <button
                    onClick={() => toggleActive(store.id, store.isActive)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                      store.isActive
                        ? "bg-slate-100 text-black hover:bg-slate-200"
                        : "bg-slate-100 text-slate-700 hover:bg-red-100"
                    }`}
                  >
                    {store.isActive ? "Aktif" : "Pasif"}
                  </button>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/stores/${store.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                      <Pencil size={15} />
                    </Link>
                    <button onClick={() => handleDelete(store.id)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-slate-400">Mağaza bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
