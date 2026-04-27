"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, Megaphone } from "lucide-react";
import Logo from "./Logo";

const BENEFITS = [
  { icon: Users, title: "Müşteri Sadakati Artır", desc: "Tekrarlayan ziyaretler ve bağlı müşteri tabanı." },
  { icon: BarChart3, title: "Veri Analitiği", desc: "Satış ve davranış verileriyle bilinçli karar al." },
  { icon: Megaphone, title: "Kolay Kampanya Yönetimi", desc: "Damga ve puan kampanyalarını tek panelden yönet." },
];

export default function BusinessSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="isletmeler-icin">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
              İşletmeler İçin
            </h2>
            <p className="mt-4 text-lg text-trinq-muted/90">
              trinQ ile müşteri sadakati programını dijitalleştir, verilerini takip et.
            </p>
            <ul className="mt-8 space-y-5">
              {BENEFITS.map((b, i) => (
                <motion.li
                  key={b.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-trinq-accent">
                    <b.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-trinq-navy">{b.title}</h3>
                    <p className="mt-1 text-trinq-muted/90">{b.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="#giris"
                className="inline-flex rounded-full bg-trinq-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-trinq-accent/15 transition hover:bg-trinq-accent-hover"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                İşletme Hesabı Oluştur
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative w-full max-w-md rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-2xl">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-trinq-accent">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-trinq-navy">trinQ İşletme Paneli</p>
                    <p className="text-[11px] text-slate-400">Kafe Merkez · Bugün</p>
                  </div>
                </div>
                <span className="rounded-full bg-trinq-accent/10 px-2.5 py-1 text-[10px] font-semibold text-trinq-accent">Aktif</span>
              </div>

              {/* Mini Stats Row */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Günlük Ziyaret", value: "127", change: "+12%" },
                  { label: "Aktif Damga", value: "843", change: "+8%" },
                  { label: "Kampanya", value: "5", change: "Çalışıyor" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-lg font-bold text-trinq-navy">{stat.value}</p>
                    <p className="text-[10px] text-slate-400">{stat.label}</p>
                    <p className="mt-0.5 text-[10px] font-semibold text-trinq-accent">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Mini Chart */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="mb-3 text-xs font-semibold text-trinq-navy">Haftalık Ziyaretçi</p>
                <div className="flex items-end gap-1.5" style={{ height: 64 }}>
                  {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-md bg-gradient-to-t from-trinq-accent to-trinq-accent-light"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-slate-400">
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-trinq-navy">Son Aktiviteler</p>
                {[
                  { text: "Yeni damga kazanıldı", time: "2 dk önce", color: "bg-trinq-accent" },
                  { text: "Kampanya tamamlandı", time: "15 dk önce", color: "bg-trinq-accent/70" },
                  { text: "Yeni müşteri kaydı", time: "1 sa önce", color: "bg-[#11392e]" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 border-b border-slate-50 py-2 last:border-0">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <p className="flex-1 text-xs text-slate-600">{item.text}</p>
                    <p className="text-[10px] text-slate-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
