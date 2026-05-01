"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Mehmet K.",
    role: "Kafe Sahibi",
    business: "Brew & Bean Coffee",
    rating: 5,
    text: "trinQ'ye geçtiğimiz günden beri müşterilerimizin geri dönüş oranı %40 arttı. Fiziksel damga kartlarından kurtulduk, her şey dijital ve kusursuz.",
  },
  {
    name: "Ayşe T.",
    role: "İşletme Müdürü",
    business: "Lezzet Durağı Restoran",
    rating: 5,
    text: "Panel üzerinden kampanya oluşturmak inanılmaz kolay. Öğrenci kampanyalarımız sayesinde öğle saatlerinde doluluk oranımız ikiye katlandı.",
  },
  {
    name: "Can D.",
    role: "Fırın Sahibi",
    business: "Simit & Kahve",
    rating: 4,
    text: "trinQ'nin analitik paneli sayesinde en çok satan ürünlerimi ve müşteri alışkanlıklarımı net görüyorum. Veri odaklı kararlar almaya başladım.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-trinq-accent text-trinq-accent"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-trinq-navy sm:text-4xl">
            İşletmeler Ne Diyor?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-trinq-muted/80">
            trinQ kullanan işletme sahiplerinin deneyimlerine göz atın.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="group relative flex flex-col rounded-[24px] border border-gray-100 bg-[#FAFBFC] p-6 shadow-sm transition-all hover:border-trinq-accent/20 hover:shadow-lg sm:p-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Tırnak ikonu */}
              <Quote
                size={32}
                className="mb-4 text-trinq-accent/20 transition-colors group-hover:text-trinq-accent/40"
              />

              {/* Yıldızlar */}
              <StarRating rating={t.rating} />

              {/* Yorum */}
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-trinq-muted/90">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Kullanıcı bilgisi */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-trinq-accent/10 text-sm font-bold text-trinq-accent">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-trinq-navy">{t.name}</p>
                  <p className="text-xs text-trinq-muted/70">
                    {t.role} · {t.business}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
