"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Layers, Sparkles } from "lucide-react";
import {
  defaultCampaignWizardValues,
  campaignWizardFormSchema,
  type CampaignWizardFormValues,
} from "./schema";
import { applyFieldErrors, getStep1Errors, getStep3Errors } from "./validate-steps";
import CampaignPreviewCard from "./CampaignPreviewCard";
import ProductSelectModal from "./ProductSelectModal";
import { MOCK_MENU_CATEGORIES } from "./constants";

const STEPS = [
  { n: 1, title: "Bilgiler", desc: "Görsel, ad ve açıklama" },
  { n: 2, title: "Tür & menü", desc: "Kampanya yapısı" },
  { n: 3, title: "Koşullar", desc: "İndirim ve hedefler" },
  { n: 4, title: "Limitler", desc: "Mağaza, kullanım, tarih" },
] as const;

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export default function NewCampaignWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [stores, setStores] = useState<{ id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CampaignWizardFormValues>({
    defaultValues: defaultCampaignWizardValues,
    resolver: zodResolver(campaignWizardFormSchema) as Resolver<CampaignWizardFormValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { register, control, handleSubmit, watch, setValue, setError, clearErrors, formState } = form;
  const values = watch();

  useEffect(() => {
    fetch("/api/stores")
      .then((r) => r.json())
      .then((list: { id: string; name: string }[]) => {
        setStores(Array.isArray(list) ? list : []);
        if (list?.length && !form.getValues("storeId")) {
          setValue("storeId", list[0].id);
        }
      })
      .catch(() => {});
  }, [setValue, form]);

  const basis = watch("basis");
  const menu = watch("menu");
  const discountType = watch("discountType");

  const goNext = () => {
    clearErrors();
    if (step === 1) {
      const e = getStep1Errors(form.getValues());
      if (Object.keys(e).length) {
        applyFieldErrors(e, setError);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (step === 3) {
      const e = getStep3Errors(form.getValues());
      if (Object.keys(e).length) {
        applyFieldErrors(e, setError);
        return;
      }
      setStep(4);
      return;
    }
  };

  const goBack = () => {
    clearErrors();
    if (step > 1) setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s));
  };

  /** Son adım: Zod + zodResolver ile doğrulanmış gövde */
  const onValidSubmit = async (data: CampaignWizardFormValues) => {
    setSubmitting(true);
    try {
      const meta = {
        basis: data.basis,
        menu: data.menu,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minSpendTL: data.minSpendTL,
        maxDiscountTL: data.maxDiscountTL,
        minBasketTL: data.minBasketTL,
        maxUsagePerUser: data.maxUsagePerUser,
        productIds: data.selectedProductIds,
        categoryIds: data.selectedCategoryIds,
        imagePreview: data.imagePreview,
      };
      const body = {
        title: data.campaignName,
        description: `${data.campaignDescription}\n\n[trinQ] ${JSON.stringify(meta)}`.slice(0, 4000),
        type: `wizard_${data.basis}_${data.menu}`,
        discount: data.discountValue ?? 0,
        discountType: data.discountType ?? "percent",
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        storeId: data.storeId,
        isActive: true,
        usageLimit: data.maxUsageGlobal,
      };
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) router.push("/admin/campaigns");
      else setError("root", { message: "Kayıt başarısız. Alanları kontrol edin." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#f0f4f8] via-white to-[#e8f4f2]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/campaigns"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a]/70 transition hover:text-[#171717]"
            >
              <ArrowLeft size={16} /> Kampanyalara dön
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-[#0a0a0a] lg:text-3xl">Yeni Kampanya Sihirbazı</h1>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              trinQ işletme paneli — dört adımda senaryoya özel kampanya oluşturun.
            </p>
          </div>
        </div>

        {/* Adım göstergesi */}
        <div className="mb-10 flex flex-wrap items-center gap-2 lg:gap-4">
          {STEPS.map((s, i) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <div key={s.n} className="flex min-w-0 flex-1 items-center gap-2 lg:gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      active
                        ? "bg-black text-white ring-2 ring-black/20"
                        : done
                          ? "bg-[#0a0a0a] text-white"
                          : "border border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {done ? <Check size={16} /> : s.n}
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className={`truncate text-xs font-bold ${active ? "text-[#0a0a0a]" : "text-slate-400"}`}>
                      {s.title}
                    </p>
                    <p className="truncate text-[10px] text-slate-500">{s.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`hidden h-px w-6 shrink-0 sm:block lg:w-10 ${done ? "bg-[#171717]/60" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <form
            onSubmit={handleSubmit(onValidSubmit)}
            className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md lg:p-8"
          >
            {formState.errors.root && (
              <p className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{formState.errors.root.message}</p>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.section key="s1" {...fade} className="space-y-6">
                  <div className="flex items-center gap-2 text-[#0a0a0a]">
                    <Sparkles className="text-[#171717]" size={22} />
                    <h2 className="text-lg font-bold">Kampanya bilgileri</h2>
                  </div>
                  <Controller
                    name="imagePreview"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Kampanya görseli</label>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#171717]/35 bg-[#171717]/[0.04] px-6 py-10 transition hover:border-[#171717]/60 hover:bg-[#171717]/[0.07]">
                          <ImagePlus className="text-[#171717]" size={36} />
                          <span className="mt-2 text-sm font-medium text-[#0a0a0a]/80">Yüklemek için tıklayın</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => field.onChange(typeof reader.result === "string" ? reader.result : "");
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                        {field.value && (
                          <p className="mt-2 text-xs text-emerald-600">Görsel hazır — önizlemede görünür.</p>
                        )}
                      </div>
                    )}
                  />
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Kampanya adı</label>
                    <input
                      {...register("campaignName")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      placeholder="Örn. Hafta içi kahve indirimi"
                    />
                    {formState.errors.campaignName && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.campaignName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Açıklama</label>
                    <textarea
                      {...register("campaignDescription")}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      placeholder="Müşterilere nasıl bir fayda sunuyorsunuz?"
                    />
                    {formState.errors.campaignDescription && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.campaignDescription.message}</p>
                    )}
                  </div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section key="s2" {...fade} className="space-y-8">
                  <div className="flex items-center gap-2 text-[#0a0a0a]">
                    <Layers className="text-[#171717]" size={22} />
                    <h2 className="text-lg font-bold">Kampanya türü</h2>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#0a0a0a]">Ürün bazlı mı, sepet toplamı mı?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          { v: "product" as const, label: "Ürün bazlı", sub: "Belirli ürün veya menü kalemleri" },
                          { v: "total" as const, label: "Toplam tutar bazlı", sub: "Sepet toplamına göre indirim" },
                        ] as const
                      ).map((opt) => (
                        <label
                          key={opt.v}
                          className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                            basis === opt.v
                              ? "border-[#171717] bg-[#171717]/10 ring-1 ring-[#171717]/20"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input type="radio" className="sr-only" {...register("basis")} value={opt.v} />
                          <p className="font-bold text-[#0a0a0a]">{opt.label}</p>
                          <p className="mt-1 text-xs text-slate-600">{opt.sub}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#0a0a0a]">Menü entegrasyonu</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          { v: "without_menu" as const, label: "Menüsüz", sub: "Hızlı kural seti" },
                          { v: "with_menu" as const, label: "Menülü", sub: "Ürün/kategori hedefleme" },
                        ] as const
                      ).map((opt) => (
                        <label
                          key={opt.v}
                          className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                            menu === opt.v
                              ? "border-[#171717] bg-[#171717]/10 ring-1 ring-[#171717]/20"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input type="radio" className="sr-only" {...register("menu")} value={opt.v} />
                          <p className="font-bold text-[#0a0a0a]">{opt.label}</p>
                          <p className="mt-1 text-xs text-slate-600">{opt.sub}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {step === 3 && (
                <motion.section key="s3" {...fade} className="space-y-6">
                  <h2 className="text-lg font-bold text-[#0a0a0a]">İndirim ve koşullar</h2>

                  {/* Ürün + menülü: ürün seç */}
                  {basis === "product" && menu === "with_menu" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setProductModalOpen(true)}
                        className="w-full rounded-xl border-2 border-dashed border-[#171717]/50 bg-[#171717]/5 py-4 text-sm font-bold text-[#0a0a0a] transition hover:bg-[#171717]/10"
                      >
                        Ürünleri Seç ({values.selectedProductIds?.length ?? 0})
                      </button>
                      {formState.errors.selectedProductIds && (
                        <p className="text-xs text-red-500">{formState.errors.selectedProductIds.message as string}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Toplam + menülü: kategori */}
                  {basis === "total" && menu === "with_menu" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <p className="text-sm font-semibold text-[#0a0a0a]">Hedef kategoriler</p>
                      <div className="flex flex-wrap gap-2">
                        {MOCK_MENU_CATEGORIES.map((c) => {
                          const on = values.selectedCategoryIds?.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                const cur = values.selectedCategoryIds ?? [];
                                if (on) setValue(
                                  "selectedCategoryIds",
                                  cur.filter((x) => x !== c.id)
                                );
                                else setValue("selectedCategoryIds", [...cur, c.id]);
                              }}
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                on
                        ? "bg-black text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-black/30"
                              }`}
                            >
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                      {formState.errors.selectedCategoryIds && (
                        <p className="text-xs text-red-500">{formState.errors.selectedCategoryIds.message as string}</p>
                      )}
                    </motion.div>
                  )}

                  {/* İndirim tipi: ürün menüsüz; ürün menülü; toplam */}
                  {(basis === "product" ||
                    basis === "total") && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <p className="text-sm font-semibold text-[#0a0a0a]">İndirim tipi</p>
                      <div className="flex flex-wrap gap-2">
                        {(["percent", "fixed"] as const).map((dt) => (
                          <label
                            key={dt}
                            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition ${
                              discountType === dt
                        ? "bg-black text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-black/30"
                            }`}
                          >
                            <input type="radio" className="sr-only" {...register("discountType")} value={dt} />
                            {dt === "percent" ? "Yüzde (%)" : "Sabit tutar (₺)"}
                          </label>
                        ))}
                      </div>
                      {formState.errors.discountType && (
                        <p className="text-xs text-red-500">{formState.errors.discountType.message}</p>
                      )}
                    </motion.div>
                  )}

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 sm:grid-cols-2">
                    {/* Ana tutar / oran */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
                        {discountType === "percent" ? "İndirim oranı (%)" : "İndirim tutarı (₺)"}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min={0}
                        {...register("discountValue")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      />
                      {formState.errors.discountValue && (
                        <p className="mt-1 text-xs text-red-500">{formState.errors.discountValue.message}</p>
                      )}
                    </div>

                    {/* Ürün menülü */}
                    {basis === "product" && menu === "with_menu" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Min. harcama (₺)</label>
                          <input
                            type="number"
                            min={0}
                            {...register("minSpendTL")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                          />
                          {formState.errors.minSpendTL && (
                            <p className="mt-1 text-xs text-red-500">{formState.errors.minSpendTL.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Maks. indirim (₺)</label>
                          <input
                            type="number"
                            min={0}
                            {...register("maxDiscountTL")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                          />
                          {formState.errors.maxDiscountTL && (
                            <p className="mt-1 text-xs text-red-500">{formState.errors.maxDiscountTL.message}</p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Toplam tutar: min sepet */}
                    {basis === "total" && (
                      <>
                        <div className="sm:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Minimum sepet (₺)</label>
                          <input
                            type="number"
                            min={0}
                            {...register("minBasketTL")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                          />
                          {formState.errors.minBasketTL && (
                            <p className="mt-1 text-xs text-red-500">{formState.errors.minBasketTL.message}</p>
                          )}
                        </div>
                        {discountType === "percent" && (
                          <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Maksimum indirim (₺)</label>
                            <input
                              type="number"
                              min={0}
                              {...register("maxDiscountTL")}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                            />
                            {formState.errors.maxDiscountTL && (
                              <p className="mt-1 text-xs text-red-500">{formState.errors.maxDiscountTL.message}</p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </motion.section>
              )}

              {step === 4 && (
                <motion.section key="s4" {...fade} className="space-y-6">
                  <h2 className="text-lg font-bold text-[#0a0a0a]">Mağaza ve yayın süresi</h2>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Mağaza</label>
                    <select
                      {...register("storeId")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                    >
                      <option value="">Seçin</option>
                      {stores.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {formState.errors.storeId && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.storeId.message}</p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Toplam kullanım limiti</label>
                      <input
                        type="number"
                        min={1}
                        {...register("maxUsageGlobal")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      />
                      {formState.errors.maxUsageGlobal && (
                        <p className="mt-1 text-xs text-red-500">{formState.errors.maxUsageGlobal.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Kullanıcı başına limit</label>
                      <input
                        type="number"
                        min={1}
                        {...register("maxUsagePerUser")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      />
                      {formState.errors.maxUsagePerUser && (
                        <p className="mt-1 text-xs text-red-500">{formState.errors.maxUsagePerUser.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Başlangıç</label>
                      <input
                        type="date"
                        {...register("startDate")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      />
                      {formState.errors.startDate && (
                        <p className="mt-1 text-xs text-red-500">{formState.errors.startDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#0a0a0a]">Bitiş</label>
                      <input
                        type="date"
                        {...register("endDate")}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/20"
                      />
                      {formState.errors.endDate && (
                        <p className="mt-1 text-xs text-red-500">{formState.errors.endDate.message}</p>
                      )}
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-xl border border-[#171717]/50 px-5 py-2.5 text-sm font-bold text-[#171717] transition hover:bg-[#171717]/10 disabled:pointer-events-none disabled:opacity-40"
              >
                Geri
              </button>
              <div className="flex gap-3">
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800"
                  >
                    İleri <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {submitting ? "Kaydediliyor…" : "Kampanyayı oluştur"}
                  </button>
                )}
              </div>
            </div>
          </form>

          <aside className="lg:sticky lg:top-24">
            <CampaignPreviewCard values={values} />
          </aside>
        </div>
      </div>

      <ProductSelectModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        selectedIds={values.selectedProductIds ?? []}
        onChange={(ids) => setValue("selectedProductIds", ids, { shouldValidate: true })}
      />
    </div>
  );
}
