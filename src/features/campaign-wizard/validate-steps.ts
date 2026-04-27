import type { UseFormSetError, FieldPath } from "react-hook-form";
import type { CampaignWizardFormValues } from "./schema";

type ErrMap = Partial<Record<FieldPath<CampaignWizardFormValues>, string>>;

function n(v: unknown): number | undefined {
  if (v === "" || v === null || v === undefined) return undefined;
  const x = Number(v);
  return Number.isFinite(x) ? x : undefined;
}

/** Adım 1: sadece isim + açıklama (görsel isteğe bağlı) */
export function getStep1Errors(v: CampaignWizardFormValues): ErrMap {
  const e: ErrMap = {};
  if (v.campaignName.trim().length < 2) e.campaignName = "En az 2 karakter.";
  if (v.campaignDescription.trim().length < 10) e.campaignDescription = "En az 10 karakter.";
  return e;
}

/** Adım 3: senaryo mantığı (tür & menü `v` içinde) */
export function getStep3Errors(v: CampaignWizardFormValues): ErrMap {
  const e: ErrMap = {};
  const productNoMenu = v.basis === "product" && v.menu === "without_menu";
  const productMenu = v.basis === "product" && v.menu === "with_menu";
  const totalNoMenu = v.basis === "total" && v.menu === "without_menu";
  const totalMenu = v.basis === "total" && v.menu === "with_menu";

  const dv = n(v.discountValue);
  const minSpend = n(v.minSpendTL);
  const maxDisc = n(v.maxDiscountTL);
  const minBasket = n(v.minBasketTL);

  if (productNoMenu) {
    if (!v.discountType) e.discountType = "İndirim tipi seçin.";
    if (dv == null || dv <= 0) e.discountValue = "Geçerli tutar girin.";
    if (v.discountType === "percent" && dv != null && dv > 100) {
      e.discountValue = "Yüzde en fazla 100.";
    }
  }

  if (productMenu) {
    if (v.selectedProductIds.length === 0) e.selectedProductIds = "Ürün seçin.";
    if (!v.discountType) e.discountType = "İndirim tipi seçin.";
    if (dv == null || dv <= 0) e.discountValue = "İndirim değeri girin.";
    if (v.discountType === "percent" && dv != null && dv > 100) {
      e.discountValue = "Yüzde en fazla 100.";
    }
    if (minSpend == null || minSpend <= 0) e.minSpendTL = "Minimum harcama girin.";
    if (maxDisc == null || maxDisc <= 0) e.maxDiscountTL = "Maksimum indirim girin.";
  }

  if (totalNoMenu || totalMenu) {
    if (!v.discountType) e.discountType = "İndirim tipi seçin.";
    if (v.discountType === "fixed") {
      if (minBasket == null || minBasket <= 0) e.minBasketTL = "Minimum sepet girin.";
      if (dv == null || dv <= 0) e.discountValue = "İndirim tutarı (₺) girin.";
    }
    if (v.discountType === "percent") {
      if (minBasket == null || minBasket <= 0) e.minBasketTL = "Minimum sepet girin.";
      if (maxDisc == null || maxDisc <= 0) e.maxDiscountTL = "Maksimum indirim girin.";
      if (dv == null || dv <= 0 || dv > 100) {
        e.discountValue = "Geçerli yüzde (1–100).";
      }
    }
  }

  if (totalMenu && v.selectedCategoryIds.length === 0) {
    e.selectedCategoryIds = "Kategori seçin.";
  }

  return e;
}

export function applyFieldErrors(
  errors: ErrMap,
  setError: UseFormSetError<CampaignWizardFormValues>
) {
  (Object.entries(errors) as [FieldPath<CampaignWizardFormValues>, string][]).forEach(([name, message]) => {
    setError(name, { type: "manual", message });
  });
}
