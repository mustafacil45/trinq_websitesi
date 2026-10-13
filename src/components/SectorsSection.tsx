"use client";

import {
  Coffee,
  UtensilsCrossed,
  Cake,
  Croissant,
  Pizza,
  CupSoda,
  EggFried,
  ChefHat,
} from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";

/**
 * Yalnızca kafe & restoran dünyası.
 * (Kuaför, güzellik merkezi, spor salonu gibi hizmet işletmeleri kaldırıldı.)
 */
const SECTORS = [
  { icon: Coffee, label: "Kafe" },
  { icon: UtensilsCrossed, label: "Restoran" },
  { icon: CupSoda, label: "Kahveci" },
  { icon: EggFried, label: "Brunch" },
  { icon: Cake, label: "Tatlı & Pastane" },
  { icon: Croissant, label: "Fırın" },
  { icon: Pizza, label: "Burger & Pizza" },
  { icon: ChefHat, label: "Ocakbaşı & Kebap" },
];

function Chip({ icon: Icon, label }: { icon: typeof Coffee; label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-trinq-line bg-white px-5 py-3.5 shadow-[var(--shadow-xs)]">
      <Icon size={19} strokeWidth={1.8} className="shrink-0 text-trinq-navy-mid" />
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-trinq-navy">
        {label}
      </span>
    </div>
  );
}

export default function SectorsSection({
  audience = "business",
}: {
  audience?: "business" | "user";
}) {
  const isBusiness = audience === "business";

  return (
    <Section id="sektorler" tone="light">
      <SectionHeading
        eyebrow={isBusiness ? "Kimler için" : "Nerelerde geçerli"}
        title={
          isBusiness
            ? "Kafeler ve restoranlar için kuruldu"
            : "Yeme-içme mekânlarında geçerli"
        }
        subtitle={
          isBusiness
            ? "Müşterisi geri gelen her yeme-içme işletmesi trinQ ile çalışır. Köşedeki kahveciden çok şubeli zincire kadar."
            : "trinQ yeme-içme mekânlarına odaklanıyor. Uygulamadaki haritadan yakınındaki anlaşmalı yerleri görebilirsin."
        }
      />

      {/* Kesintisiz akan şerit — mobilde sıkışık ızgara yerine akıcı bir ritim */}
      {/*
        İki katman: dıştaki `.sd-drift-x` scroll'a bağlı yatay kayma,
        içteki `.marquee-track` kendi kendine akan sonsuz şerit. Üst üste
        binince şerit scroll ederken hızlanıyor, dururken sakin akıyor.
      */}
      <div className="marquee-mask group relative mt-12 overflow-hidden sm:mt-16">
        <div className="sd-drift-x" style={{ "--sd-dx": "3%" } as React.CSSProperties}>
          <div className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused] sm:gap-4">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 gap-3 sm:gap-4" aria-hidden={dup === 1}>
                {SECTORS.map((s) => (
                  <Chip key={`${dup}-${s.label}`} icon={s.icon} label={s.label} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee-mask group relative mt-3 overflow-hidden sm:mt-4" aria-hidden>
        <div className="sd-drift-x" style={{ "--sd-dx": "-3%" } as React.CSSProperties}>
          <div
            className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused] sm:gap-4"
            style={{ animationDirection: "reverse", animationDuration: "46s" }}
          >
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 gap-3 sm:gap-4">
                {[...SECTORS].reverse().map((s) => (
                  <Chip key={`r-${dup}-${s.label}`} icon={s.icon} label={s.label} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
