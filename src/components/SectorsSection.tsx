"use client";

import { motion } from "framer-motion";
import { Coffee, UtensilsCrossed, Cake, Sparkles, Scissors, Gem, Dumbbell, MoreHorizontal } from "lucide-react";

const SECTORS = [
  { icon: Coffee, label: "Kafe" },
  { icon: UtensilsCrossed, label: "Restoran" },
  { icon: Cake, label: "Tatlı & Pastane" },
  { icon: Sparkles, label: "Güzellik Merkezi" },
  { icon: Scissors, label: "Kuaför" },
  { icon: Gem, label: "Nail Studio" },
  { icon: Dumbbell, label: "Spor Salonu" },
  { icon: MoreHorizontal, label: "Ve Daha Fazlası" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } },
};

export default function SectorsSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="sektorler">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-trinq-accent">
            SEKTÖRLER
          </span>
          <h2 className="mt-3 text-3xl font-bold text-trinq-navy sm:text-4xl">
            Her İşletme Türüne Uygun
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-trinq-muted/90">
            Kafe, restoran, güzellik merkezi ve daha fazlası. trinQ her sektörün sadakat ihtiyacına yanıt verir.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 lg:gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SECTORS.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-trinq-accent/25 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-trinq-accent/10">
                <s.icon className="h-7 w-7 text-trinq-navy transition-colors group-hover:text-trinq-accent" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-trinq-navy">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
