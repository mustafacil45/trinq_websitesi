"use client";

import { Star, Quote } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Stagger, StaggerItem } from "./ui/Reveal";

/**
 * ⚠️ Bu referanslar gerçek müşteri yorumu değilse yayında tutmak hem güven
 * hem de reklam mevzuatı açısından risklidir. Gerçekleriyle değiştirin ya da
 * aşağıdaki sabiti `false` yapıp bölümü gizleyin.
 */
export const SHOW_TESTIMONIALS = true;

const TESTIMONIALS = [
  {
    name: "Mehmet K.",
    role: "Kafe Sahibi",
    business: "Brew & Bean Coffee",
    rating: 5,
    text: "trinQ'ye geçtiğimiz günden beri müşterilerimizin geri dönüş oranı arttı. Fiziksel damga kartlarından kurtulduk, her şey dijital.",
  },
  {
    name: "Ayşe T.",
    role: "İşletme Müdürü",
    business: "Lezzet Durağı Restoran",
    rating: 5,
    text: "Panel üzerinden kampanya oluşturmak inanılmaz kolay. Öğrenci kampanyalarımız sayesinde öğle saatlerinde doluluk belirgin şekilde arttı.",
  },
  {
    name: "Can D.",
    role: "Fırın Sahibi",
    business: "Simit & Kahve",
    rating: 4,
    text: "Analitik paneli sayesinde en çok satan ürünlerimi ve müşteri alışkanlıklarımı net görüyorum. Veri odaklı kararlar almaya başladım.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5 puan`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={
            i < rating
              ? "fill-trinq-gold text-trinq-gold"
              : "fill-trinq-navy/10 text-trinq-navy/10"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <Section tone="paper">
      <SectionHeading
        eyebrow="Referanslar"
        title="İşletmeler ne diyor?"
        subtitle="trinQ kullanan işletme sahiplerinin deneyimleri."
      />

      <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3" gap={0.1}>
        {TESTIMONIALS.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="card card-hover flex h-full flex-col p-6 sm:p-7">
              <Quote size={26} className="text-trinq-navy/15" />
              <div className="mt-4">
                <StarRating rating={t.rating} />
              </div>
              <blockquote className="t-body mt-4 flex-1 text-trinq-muted">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-trinq-line pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-trinq-navy text-sm font-bold text-trinq-cream">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-trinq-navy">{t.name}</span>
                  <span className="block text-xs text-trinq-muted/80">
                    {t.role} · {t.business}
                  </span>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
