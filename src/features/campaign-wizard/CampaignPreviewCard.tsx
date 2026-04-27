"use client";

import { motion } from "framer-motion";
import type { CampaignWizardFormValues } from "./schema";

type Props = {
  values: Partial<CampaignWizardFormValues>;
};

/** Mobil kart önizlemesi — panel ile uyumlu siyah / beyaz / gri */
export default function CampaignPreviewCard({ values }: Props) {
  const title = values.campaignName?.trim() || "Kampanya adı";
  const desc = values.campaignDescription?.trim() || "Kısa açıklama burada görünür.";
  const img = values.imagePreview;

  const discountLabel = (() => {
    const v = values.discountValue;
    if (v == null || v <= 0) return "İndirim";
    if (values.discountType === "fixed") return `₺${v}`;
    return `%${v}`;
  })();

  const badge =
    values.basis === "product"
      ? values.menu === "with_menu"
        ? "Ürün · Menülü"
        : "Ürün"
      : values.menu === "with_menu"
        ? "Sepet · Menülü"
        : "Sepet";

  return (
    <motion.div
      layout
      className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
    >
      <div className="border-b border-slate-100 bg-[#FAFAFA] px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Canlı önizleme</p>
        <p className="mt-1 text-xs text-slate-500">trinQ uygulama kartı</p>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#FAFAFA]">
          <div className="relative aspect-[16/10] w-full bg-slate-100">
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URLs from upload
              <img src={img} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[11px] text-slate-400">Görsel yükleyin</div>
            )}
            <div className="absolute bottom-3 left-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-bold text-white">
              {discountLabel}
            </div>
          </div>
          <div className="border-t border-slate-100 bg-white p-4">
            <span className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-black">
              {badge}
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-black">{title}</h3>
            <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-slate-600">{desc}</p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500">
              <span>
                {values.startDate && values.endDate
                  ? `${values.startDate} → ${values.endDate}`
                  : "Tarih aralığı"}
              </span>
              <span className="font-semibold text-black">
                {values.maxUsageGlobal != null ? `${values.maxUsageGlobal} kullanım` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
