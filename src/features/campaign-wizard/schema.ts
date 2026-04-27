import { z } from "zod";

/** Form inputları string dönebildiği için güvenli sayı parse (Zod 4 uyumu) */
const optionalNum = (min = 0) =>
  z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
  }, z.number().min(min).optional());

const requiredInt = (min: number, msg: string) =>
  z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return NaN;
    const n = Number(val);
    return Number.isFinite(n) ? Math.trunc(n) : NaN;
  }, z.number().int().min(min, msg));

/** Kampanya temeli: ürün veya sepet toplamı */
export const basisSchema = z.enum(["product", "total"]);
/** Menü entegrasyonu */
export const menuSchema = z.enum(["with_menu", "without_menu"]);
/** İndirim birimi */
export const discountTypeSchema = z.enum(["percent", "fixed"]);

export type CampaignBasis = z.infer<typeof basisSchema>;
export type CampaignMenu = z.infer<typeof menuSchema>;
export type DiscountType = z.infer<typeof discountTypeSchema>;

/**
 * Tüm sihirbaz alanları — adım geçişlerinde `trigger` ile alt kümeler doğrulanır;
 * gönderimde `superRefine` senaryoya göre eksik alanları işaretler.
 */
export const campaignWizardFormSchema = z
  .object({
    // —— Step 1: Genel bilgi ——
    campaignName: z.string().min(2, "Kampanya adı en az 2 karakter olmalı."),
    campaignDescription: z.string().min(10, "Açıklama en az 10 karakter olmalı."),
    /** Önizleme için data URL (isteğe bağlı) */
    imagePreview: z.string().optional(),

    // —— Step 2: Tür & menü ——
    basis: basisSchema,
    menu: menuSchema,

    // —— Step 3: Sayısal mantık ——
    discountType: discountTypeSchema.optional(),
    /** % indirim oranı veya TL tutarı (senaryoya göre anlamı değişir) */
    discountValue: optionalNum(0),
    /** Ürün + menülü: minimum harcama */
    minSpendTL: optionalNum(0),
    /** Ürün + menülü: tavan indirim; toplam + %: maks indirim */
    maxDiscountTL: optionalNum(0),
    /** Toplam tutar senaryoları: minimum sepet */
    minBasketTL: optionalNum(0),
    selectedProductIds: z.array(z.string()),
    selectedCategoryIds: z.array(z.string()),

    // —— Step 4: Mağaza, limitler & tarihler ——
    storeId: z.string().min(1, "Mağaza seçin."),
    maxUsageGlobal: requiredInt(1, "Toplam kullanım en az 1 olmalı."),
    maxUsagePerUser: requiredInt(1, "Kullanıcı başına en az 1 olmalı."),
    startDate: z.string().min(1, "Başlangıç tarihi seçin."),
    endDate: z.string().min(1, "Bitiş tarihi seçin."),
  })
  .superRefine((data, ctx) => {
    const { basis, menu } = data;
    const productNoMenu = basis === "product" && menu === "without_menu";
    const productMenu = basis === "product" && menu === "with_menu";
    const totalNoMenu = basis === "total" && menu === "without_menu";
    const totalMenu = basis === "total" && menu === "with_menu";

    if (!data.storeId?.trim()) {
      ctx.addIssue({ code: "custom", path: ["storeId"], message: "Mağaza seçin." });
    }

    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Bitiş tarihi başlangıçtan önce olamaz.",
      });
    }

    // Ürün + menüsüz: indirim tipi + tutar
    if (productNoMenu) {
      if (!data.discountType) {
        ctx.addIssue({ code: "custom", path: ["discountType"], message: "İndirim tipi seçin." });
      }
      if (data.discountValue == null || data.discountValue <= 0) {
        ctx.addIssue({ code: "custom", path: ["discountValue"], message: "Geçerli bir indirim tutarı girin." });
      }
      if (data.discountType === "percent" && data.discountValue != null && data.discountValue > 100) {
        ctx.addIssue({ code: "custom", path: ["discountValue"], message: "Yüzde en fazla 100 olabilir." });
      }
    }

    // Ürün + menülü: ürün seçimi + indirim tipi + tutar + min harcama / max indirim
    if (productMenu) {
      if (!data.discountType) {
        ctx.addIssue({ code: "custom", path: ["discountType"], message: "İndirim tipi seçin." });
      }
      if (data.discountType === "percent" && data.discountValue != null && data.discountValue > 100) {
        ctx.addIssue({ code: "custom", path: ["discountValue"], message: "Yüzde en fazla 100 olabilir." });
      }
      if (data.selectedProductIds.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["selectedProductIds"],
          message: "En az bir ürün seçmelisiniz.",
        });
      }
      if (data.discountValue == null || data.discountValue <= 0) {
        ctx.addIssue({ code: "custom", path: ["discountValue"], message: "İndirim tutarı / oranı girin." });
      }
      if (data.minSpendTL == null || data.minSpendTL <= 0) {
        ctx.addIssue({ code: "custom", path: ["minSpendTL"], message: "Minimum harcama girin." });
      }
      if (data.maxDiscountTL == null || data.maxDiscountTL <= 0) {
        ctx.addIssue({ code: "custom", path: ["maxDiscountTL"], message: "Maksimum indirim girin." });
      }
    }

    // Toplam tutar + menüsüz / menülü: indirim tipi zorunlu
    if (totalNoMenu || totalMenu) {
      if (!data.discountType) {
        ctx.addIssue({ code: "custom", path: ["discountType"], message: "İndirim tipi seçin." });
      }
      if (data.discountType === "fixed") {
        if (data.minBasketTL == null || data.minBasketTL <= 0) {
          ctx.addIssue({ code: "custom", path: ["minBasketTL"], message: "Minimum sepet tutarı girin." });
        }
        if (data.discountValue == null || data.discountValue <= 0) {
          ctx.addIssue({ code: "custom", path: ["discountValue"], message: "İndirim tutarı (₺) girin." });
        }
      }
      if (data.discountType === "percent") {
        if (data.minBasketTL == null || data.minBasketTL <= 0) {
          ctx.addIssue({ code: "custom", path: ["minBasketTL"], message: "Minimum sepet tutarı girin." });
        }
        if (data.maxDiscountTL == null || data.maxDiscountTL <= 0) {
          ctx.addIssue({ code: "custom", path: ["maxDiscountTL"], message: "Maksimum indirim (₺) girin." });
        }
        if (data.discountValue == null || data.discountValue <= 0 || data.discountValue > 100) {
          ctx.addIssue({
            code: "custom",
            path: ["discountValue"],
            message: "Geçerli indirim yüzdesi girin (1–100).",
          });
        }
      }
    }

    // Toplam + menülü: kategori hedefi (mock: menüden seçim)
    if (totalMenu && data.selectedCategoryIds.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["selectedCategoryIds"],
        message: "Hedef kategori seçin.",
      });
    }
  });

export type CampaignWizardFormValues = z.infer<typeof campaignWizardFormSchema>;

export const defaultCampaignWizardValues: CampaignWizardFormValues = {
  campaignName: "",
  campaignDescription: "",
  imagePreview: undefined,
  basis: "product",
  menu: "without_menu",
  discountType: "percent",
  discountValue: undefined,
  minSpendTL: undefined,
  maxDiscountTL: undefined,
  minBasketTL: undefined,
  selectedProductIds: [],
  selectedCategoryIds: [],
  storeId: "",
  maxUsageGlobal: 1000,
  maxUsagePerUser: 1,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
};
