"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    q: "trinQ nedir?",
    a: "trinQ, işletmeler için özel olarak geliştirilmiş bir dijital sadakat ve kampanya yönetim platformudur. Fiziksel kart ve kağıt fiş dönemini bitirip, her şeyi tek uygulama üzerinden dijital olarak yönetmenizi sağlar.",
  },
  {
    q: "trinQ ücretsiz mi?",
    a: "Evet, trinQ uygulaması kullanıcılar için tamamen ücretsizdir. İşletmeler için farklı abonelik paketleri sunuyoruz; komisyon almıyoruz, yalnızca sabit aylık ücret uyguluyoruz.",
  },
  {
    q: "Damga ve puan nasıl kazanılır?",
    a: "Anlaşmalı işletmelerde alışveriş yaptıktan sonra kasadaki QR kodu okutarak veya 6 haneli kodu girerek damga/puan kazanırsınız. Her işletmenin ödül kuralları uygulama içinde açıkça belirtilmiştir.",
  },
  {
    q: "Verilerim ve fişlerim güvende mi?",
    a: "Kesinlikle. Tüm kullanıcı verileri şifreli olarak saklanır ve KVKK uyumlu çalışırız. İstediğiniz zaman hesabınızı ve tüm verilerinizi silebilirsiniz.",
  },
  {
    q: "Hangi işletmeler trinQ kullanıyor?",
    a: "Kafe, restoran, fırın, market, kuaför ve daha birçok sektörden işletme trinQ ile sadakat programı sunuyor. Uygulama içindeki harita üzerinden yakınlardaki tüm anlaşmalı işletmeleri keşfedebilirsiniz.",
  },
  {
    q: "Kendi mobil uygulamamı geliştirmek yerine neden trinQ kullanmalıyım?",
    a: "Kendi uygulamanızı geliştirmek hem yüksek maliyetli hem de teknik bilgi gerektirir. trinQ ise hiçbir teknik altyapı gerektirmeden, anında kullanıma hazırdır. Ayrıca kullanıcılar tek bir uygulamada onlarca işletmeye erişebildiği için görünürlüğünüz katlanarak artar.",
  },
  {
    q: "İşletmem için nasıl kayıt olabilirim?",
    a: "trinQ'ye abone olduktan sonra size özel bir işletme paneli açılır. Bu panelden markanızı, logo ve adres bilgilerinizi ekleyebilir, şubelerinizi tanımlayabilir, menüdeki ürünlerinizi yükleyebilir ve kampanyalarınızı oluşturabilirsiniz. Kurulum birkaç dakika sürer.",
  },
  {
    q: "Kampanya türleri nelerdir?",
    a: "trinQ paneli üzerinden genel kampanyalar, öğrenci kampanyaları, hoş geldin kampanyaları ve doğum günü kampanyaları oluşturabilirsiniz. Tarih aralığı, kullanım limiti ve hedef kitle gibi detayları esnek bir şekilde ayarlayabilirsiniz.",
  },
  {
    q: "Birden fazla şubem var, hepsini yönetebilir miyim?",
    a: "Evet. trinQ paneli üzerinden tüm şubelerinizi tek ekrandan yönetebilir, kampanyalarınızı ayrı ayrı veya topluca planlayabilirsiniz.",
  },
  {
    q: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
    a: "Elbette. Aboneliğinizi dilediğiniz zaman iptal edebilirsiniz. Herhangi bir cayma bedeli veya gizli ücret yoktur.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" id="sss">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-lg text-trinq-muted/90">
            Merak ettiklerinizin yanıtları burada.
          </p>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              className="overflow-hidden rounded-[24px] border border-trinq-accent/20 bg-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-trinq-navy transition hover:bg-trinq-accent/5"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-trinq-muted/80" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-trinq-accent/10"
                  >
                    <p className="px-6 py-4 text-trinq-muted/90">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA: Başka soruları olan kullanıcılar için */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-base text-trinq-muted/80">
            Başka bir sorunuz mu var?{" "}
            <Link
              href="mailto:info@trinq.app"
              className="font-bold text-trinq-accent transition hover:text-trinq-accent-hover hover:underline"
            >
              Bize ulaşın →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
