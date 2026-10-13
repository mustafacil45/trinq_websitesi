"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type SectionTone = "light" | "paper" | "cream" | "dark";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  /** Üstte ince ayraç çizgisi (beyaz→beyaz geçişlerinde ritim verir) */
  divider?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Tüm bölümler için tek kabuk: tutarlı dikey ritim, zemin tonu ve konteyner.
 * Önceden her bölüm kendi `py-14 sm:py-20 lg:py-28 bg-white` değerlerini
 * tekrarlıyordu; 10 beyaz bölüm üst üste gelince sayfa düzleşiyordu.
 */
export function Section({
  id,
  tone = "light",
  divider = false,
  tight = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        tight ? "section-tight" : "section",
        `tone-${tone}`,
        tone === "dark" ? "on-dark grain overflow-hidden" : "",
        divider ? "edge-top" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: SectionTone;
  className?: string;
}

/**
 * Bölüm başlığı — eyebrow + h2 + alt metin. Hepsi aynı ölçek ve ritimde.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <Reveal
      className={`flex max-w-3xl flex-col ${alignCls} ${className}`}
      variant="up"
    >
      {eyebrow ? (
        <span
          className={`t-eyebrow inline-flex items-center gap-2 ${
            dark ? "text-trinq-gold-soft" : "text-trinq-navy-mid"
          }`}
        >
          <span
            aria-hidden
            className={`h-px w-6 ${dark ? "bg-trinq-gold-soft/50" : "bg-trinq-navy-mid/40"}`}
          />
          {eyebrow}
        </span>
      ) : null}

      <h2 className={`t-h2 ${eyebrow ? "mt-4" : ""} ${dark ? "text-[#f6f7ef]" : "text-trinq-navy"}`}>
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`t-lead mt-4 max-w-2xl ${
            dark ? "text-[#f6f7ef]/70" : "text-trinq-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export default Section;
