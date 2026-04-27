"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check } from "lucide-react";
import { MOCK_MENU_PRODUCTS } from "./constants";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

/** Mock çoklu ürün seçimi — menülü ürün kampanyaları için */
export default function ProductSelectModal({ open, onClose, selectedIds, onChange }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [...MOCK_MENU_PRODUCTS];
    return MOCK_MENU_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
    );
  }, [q]);

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter((x) => x !== id));
    else onChange([...selectedIds, id]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="product-modal-title"
            className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 id="product-modal-title" className="text-lg font-bold text-black">
                Ürünleri Seç
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-black"
                aria-label="Kapat"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="border-b border-slate-100 px-5 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ürün veya kategori ara..."
                  className="w-full rounded-xl border border-slate-200 bg-[#FAFAFA] py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black/10"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">{selectedIds.length} ürün seçildi</p>
            </div>
            <ul className="max-h-[50vh] space-y-1 overflow-y-auto px-3 py-3">
              {filtered.map((p) => {
                const on = selectedIds.includes(p.id);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => toggle(p.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                        on
                          ? "border-black bg-slate-100 text-black"
                          : "border-transparent bg-[#FAFAFA] text-black hover:border-slate-200"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                          on ? "border-black bg-black text-white" : "border-slate-200 bg-white text-transparent"
                        }`}
                      >
                        <Check size={16} strokeWidth={2} className={on ? "opacity-100" : "opacity-0"} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{p.name}</span>
                        <span className="text-xs text-slate-500">{p.category} · ₺{p.price}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-black py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Tamam
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
