"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Receipt, TrendingUp, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Stats {
  totalStores: number;
  activeStores: number;
  activeCampaigns: number;
  totalCustomers: number;
  todayCiro: number;
  monthCiro: number;
  monthCount: number;
  dailyRevenue: { date: string; revenue: number }[];
  topCampaigns: { title: string; usageCount: number; type: string }[];
  recentTransactions: {
    id: string;
    amount: number;
    items: string;
    createdAt: string;
    store: { name: string };
  }[];
}

const STAT_CARDS = [
  { key: "todayCiro", label: "Bugünkü ciro", format: "currency" as const },
  { key: "activeStores", label: "Aktif mağaza", format: "number" as const },
  { key: "activeCampaigns", label: "Aktif kampanya", format: "number" as const },
  { key: "totalCustomers", label: "Toplam müşteri", format: "number" as const },
];

const TYPE_LABELS: Record<string, string> = {
  general: "Genel",
  student: "Öğrenci",
  welcome: "Hoş Geldin",
  birthday: "Doğum Günü",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black" />
      </div>
    );
  }

  if (!stats) return <p className="py-20 text-center text-sm text-slate-500">Veriler yüklenemedi.</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => {
          const val = stats[card.key as keyof Stats] as number;
          return (
            <div
              key={card.key}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-2xl font-bold tracking-tight text-black">
                  {card.format === "currency" ? `₺${val.toLocaleString("tr-TR")}` : val}
                </p>
                <span className="mb-0.5 flex items-center text-black/70" aria-hidden>
                  <TrendingUp size={18} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="mb-1 text-sm font-bold text-black">Son 7 gün ciro</h3>
          <p className="mb-4 text-xs text-slate-500">₺</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.dailyRevenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#f4f4f5" strokeDasharray="4 8" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={36} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  color: "#000",
                }}
                formatter={(value) => {
                  if (value == null) return ["—", "Ciro"];
                  const n = typeof value === "number" ? value : Number(value);
                  return [`₺${n.toLocaleString("tr-TR")}`, "Ciro"];
                }}
              />
              <Bar dataKey="revenue" fill="#171717" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-black">Popüler kampanyalar</h3>
          <div className="space-y-2">
            {stats.topCampaigns.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-[#FAFAFA] px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">{c.title}</p>
                  <p className="text-[11px] text-slate-500">{TYPE_LABELS[c.type] || c.type}</p>
                </div>
                <span className="ml-2 shrink-0 text-xs font-bold text-black">{c.usageCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-black">Son işlemler</h3>
          <Link
            href="/admin/transactions"
            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-black"
          >
            Tümünü gör <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="pb-2 pr-4 font-medium">Mağaza</th>
                <th className="pb-2 pr-4 font-medium">Tutar</th>
                <th className="pb-2 pr-4 font-medium">Kalemler</th>
                <th className="pb-2 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map((tx) => {
                const items = JSON.parse(tx.items) as { name: string }[];
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80">
                    <td className="py-3 pr-4 font-medium text-black">{tx.store.name}</td>
                    <td className="py-3 pr-4 font-bold text-black">
                      ₺{tx.amount.toLocaleString("tr-TR")}
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{items.map((i) => i.name).join(", ")}</td>
                    <td className="py-3 text-slate-500">
                      {new Date(tx.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <Receipt size={22} strokeWidth={1.5} className="text-black/70" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Bu ay toplam</p>
            <p className="text-2xl font-bold tracking-tight text-black">
              ₺{stats.monthCiro.toLocaleString("tr-TR")}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-slate-500">{stats.monthCount} işlem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
