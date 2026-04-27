"use client";

import { motion } from "framer-motion";
import { Smartphone, LayoutDashboard, BarChart3, Building2, Zap, Bell } from "lucide-react";

const FEATURES = [
  {
    icon: Smartphone,
    title: "Dijital Sadakat Sistemi",
    desc: "Müşterileriniz, QR kod ile saniyeler içinde puan kazanır. Fiziksel kart kullanımına gerek kalmadan hızlı ve kesintisiz bir sadakat deneyimi sunarsınız.",
  },
  {
    icon: LayoutDashboard,
    title: "Basit İşletme Paneli",
    desc: "Kullanıcı dostu yönetim panelimiz sayesinde kampanyalarınızı, müşteri verilerinizi ve sadakat süreçlerinizi tek noktadan kolayca yönetin.",
  },
  {
    icon: BarChart3,
    title: "Gerçek Zamanlı Takip",
    desc: "Müşteri ziyaretleri, harcama alışkanlıkları ve kampanya performanslarını anlık verilerle takip edin. Kararlarınızı sezgilerle değil, verilerle alın.",
  },
  {
    icon: Building2,
    title: "Çoklu Şube Desteği",
    desc: "Birden fazla şubenizi tek bir panel üzerinden yönetin. Şubeler arası performansı karşılaştırın, operasyonel verimliliği artırın.",
  },
  {
    icon: Zap,
    title: "Özelleştirilebilir Kampanyalar",
    desc: "İşletmenize özel sadakat kurguları oluşturun. \"10 kahve alana 1 ücretsiz\" veya \"500 TL harcamaya %10 indirim\" gibi kampanyalar dakikalar içinde tanımlayın.",
  },
  {
    icon: Bell,
    title: "Müşteri Bildirimleri",
    desc: "Hedefli bildirimler ve özel teklifler ile müşterilerinizi tekrar işletmenize davet edin. Sadakati sürdürülebilir bir ilişkiye dönüştürün.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export default function FeaturesGridSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="ozellikler">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-trinq-accent">
            ÖZELLİKLER
          </span>
          <h2 className="mt-3 text-3xl font-bold text-trinq-navy sm:text-4xl">
            Neler Sunuyoruz?
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-[20px] border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-trinq-accent/20 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-trinq-navy/5 transition-colors group-hover:bg-trinq-accent/10">
                <f.icon className="h-6 w-6 text-trinq-navy transition-colors group-hover:text-trinq-accent" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-trinq-navy">{f.title}</h3>
              <p className="text-sm leading-relaxed text-trinq-muted/90">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
