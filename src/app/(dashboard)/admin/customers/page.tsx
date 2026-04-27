"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Stamp, X, Check, Trash2 } from "lucide-react";

interface StampCard {
  id: string;
  customerName: string;
  customerPhone: string | null;
  totalStamps: number;
  requiredStamps: number;
  isCompleted: boolean;
  rewardTitle: string;
  store: { name: string };
}

export default function CustomersPage() {
  const [cards, setCards] = useState<StampCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stores, setStores] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({
    customerName: "", customerPhone: "", requiredStamps: 10, rewardTitle: "Ücretsiz Kahve", storeId: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/customers").then((r) => r.json()),
      fetch("/api/stores").then((r) => r.json()),
    ]).then(([c, s]) => {
      setCards(c);
      setStores(s);
      if (s.length > 0) setForm((f) => ({ ...f, storeId: s[0].id }));
    }).finally(() => setLoading(false));
  }, []);

  const filtered = cards.filter((c) => c.customerName.toLowerCase().includes(search.toLowerCase()));

  const addStamp = async (id: string, current: number, required: number) => {
    const newStamps = current + 1;
    const isCompleted = newStamps >= required;
    await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalStamps: newStamps, isCompleted }),
    });
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, totalStamps: newStamps, isCompleted } : c));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kartı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowModal(false);
      const updated = await fetch("/api/customers").then((r) => r.json());
      setCards(updated);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-32"><div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-black" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Müşteri ara..." className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white shadow-sm">
          <Plus size={18} /> Yeni Kart
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card) => (
          <div key={card.id} className={`rounded-2xl border p-5 shadow-sm transition ${card.isCompleted ? "border-slate-200 bg-slate-50" : "border-slate-100 bg-white"}`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">{card.customerName}</h3>
              {card.isCompleted && <span className="flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-black"><Check size={12} /> Tamamlandı</span>}
            </div>
            {card.customerPhone && <p className="text-xs text-slate-400">{card.customerPhone}</p>}
            <p className="mt-1 text-[11px] text-slate-400">{card.store.name}</p>

            {/* Damga Progress */}
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                <span>{card.totalStamps} / {card.requiredStamps} damga</span>
                <span className="font-bold text-black">{card.rewardTitle}</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: card.requiredStamps }, (_, i) => (
                  <div key={i} className={`h-3 flex-1 rounded-full transition ${i < card.totalStamps ? "bg-slate-1000" : "bg-slate-200"}`} />
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              {!card.isCompleted && (
                <button onClick={() => addStamp(card.id, card.totalStamps, card.requiredStamps)} className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-black hover:bg-slate-200 transition">
                  <Stamp size={14} /> Damga Ekle
                </button>
              )}
              <button onClick={() => handleDelete(card.id)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition ml-auto">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="py-12 text-center text-slate-400">Müşteri bulunamadı.</p>}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Yeni Damga Kartı</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Müşteri Adı" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black" required />
              <input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} placeholder="Telefon (opsiyonel)" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.requiredStamps} onChange={(e) => setForm({ ...form, requiredStamps: +e.target.value })} min={1} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black" />
                <input value={form.rewardTitle} onChange={(e) => setForm({ ...form, rewardTitle: e.target.value })} placeholder="Ödül" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black" required />
              </div>
              <select value={form.storeId} onChange={(e) => setForm({ ...form, storeId: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-black">
                {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <button type="submit" className="w-full rounded-xl bg-black py-3 text-sm font-bold text-white shadow-lg">Kart Oluştur</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
