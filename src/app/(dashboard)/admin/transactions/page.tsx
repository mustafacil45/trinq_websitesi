"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  items: string;
  createdAt: string;
  store: { name: string };
}

export default function TransactionsPage() {
  const [data, setData] = useState<{ transactions: Transaction[]; total: number; page: number; totalPages: number } | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/transactions?page=${page}&limit=15`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div className="flex items-center justify-center py-32"><div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-black" /></div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Toplam <strong className="text-slate-700">{data.total}</strong> işlem</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3.5">#</th>
              <th className="px-5 py-3.5">Mağaza</th>
              <th className="px-5 py-3.5">Tutar</th>
              <th className="px-5 py-3.5">Kalemler</th>
              <th className="px-5 py-3.5">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((tx, i) => {
              const items = JSON.parse(tx.items) as { name: string; qty: number; price: number }[];
              return (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-3.5 text-xs text-slate-400">{(page - 1) * 15 + i + 1}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{tx.store.name}</td>
                  <td className="px-5 py-3.5 font-bold text-black">₺{tx.amount.toLocaleString("tr-TR")}</td>
                  <td className="px-5 py-3.5 text-slate-500 max-w-[300px]">
                    {items.map((it, j) => (
                      <span key={j} className="mr-1.5 inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px]">
                        {it.name} x{it.qty}
                      </span>
                    ))}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                    {new Date(tx.createdAt).toLocaleDateString("tr-TR")} {new Date(tx.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-slate-500">
            Sayfa <strong className="text-slate-700">{page}</strong> / {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
