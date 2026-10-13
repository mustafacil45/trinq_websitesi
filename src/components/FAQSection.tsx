"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { CONTACT_EMAIL, PILOT_OFFER } from "@/lib/constants";

/**
 * Sorular kitleye göre ayrıldı ve artık SEKME YOK.
 *
 * Önceden tek bölümde "Kullanıyorum / İşletmem var" sekmeleri vardı; ana
 * sayfa işletmeye odaklandığı için ziyaretçinin kendini ilgilendirmeyen bir
 * sekmeyi atlaması gerekiyordu. Artık ana sayfa yalnızca işletme sorularını,
 * /kullanicilar yalnızca kullanıcı sorularını gösteriyor. İki liste de
 * burada duruyor — kullanıcı içeriği silinmedi.
 */
type Audience = "business" | "user";

const BUSINESS_FAQ: { q: string; a: string }[] = [
  {
    q: "trinQ nedir, işletmem için ne yapıyor?",
    a: "trinQ, kafe ve restoranların dijital damga kartları ve kampanyalarla müşteri etkileşimini yönetmesini sağlayan bir platformdur. İki parçası var: kampanyalarınızı kurduğunuz işletme paneli ve müşterilerinizin damga biriktirip kampanyalarınızı gördüğü mobil uygulama.",
  },
  {
    q: "Pilot program ne kadar sürüyor, neler ücretsiz?",
    a: `${
      PILOT_OFFER.duration
        ? `Pilot dönem ${PILOT_OFFER.duration} sürüyor. `
        : "Pilot dönem için sabit bir süre açıklamıyoruz; programı yeni başlattığımız için dönemin bitişini siz karar vermeden önce yazılı olarak bildiriyoruz. "
    }Pilotta ${PILOT_OFFER.includes
      .join(", ")
      .toLocaleLowerCase("tr-TR")} ücretsizdir.`,
  },
  {
    q: "Pilot sonrasında ücret ödeyecek miyim?",
    a: PILOT_OFFER.pricingAfter,
  },
  {
    q: "Başvuru için ödeme ya da taahhüt gerekiyor mu?",
    a: "Hayır. Başvuru sırasında kredi kartı bilgisi istemiyoruz, kurulum ücreti almıyoruz ve süre taahhüdü yok. Pilottan istediğiniz an ayrılabilirsiniz.",
  },
  {
    q: "Kurulum ne kadar sürüyor, teknik bilgi gerekiyor mu?",
    a: "Teknik bilgi gerekmiyor. Panelinizi biz açıyoruz; menü, kampanya ve işletme bilgilerinizin yüklenmesini birlikte yapıyoruz. Yeni bir cihaz almanız ya da kasa sisteminizi değiştirmeniz gerekmiyor.",
  },
  {
    q: "Kasada ne değişiyor? Personelim nasıl kullanacak?",
    a: "Kasada görünür bir QR kod duruyor. Müşteri ödeme sonrası bu QR'ı uygulamasıyla okutuyor, damga ve kampanya kullanımı otomatik işleniyor. Personelin ek bir işlem yapması gerekmiyor.",
  },
  {
    q: "Hangi kampanyaları oluşturabilirim?",
    a: "Dijital damga kartı (ör. “10 kahve alana 1 ücretsiz”) ile genel, öğrenci, hoş geldin ve doğum günü kampanyaları oluşturabilirsiniz. Her kampanyada indirim oranı, tarih aralığı ve kullanım limiti belirleyebilirsiniz.",
  },
  {
    q: "Kampanyamı sonradan değiştirebilir ya da durdurabilir miyim?",
    a: "Evet. Kampanyaları panelden dilediğiniz zaman düzenleyebilir, yayından kaldırabilir veya yeniden başlatabilirsiniz. Baskı, tasarım ya da onay süreci beklemeniz gerekmez.",
  },
  {
    q: "Birden fazla şubem var, hepsini yönetebilir miyim?",
    a: "Evet. Şubelerinizi ayrı ayrı tanımlıyoruz; kampanyalarınızı tek bir şubeye veya tümüne birlikte uygulayabilirsiniz.",
  },
  {
    q: "Kendi mobil uygulamamı geliştirmek yerine neden trinQ?",
    a: "Kendi uygulamanızı geliştirmek yüksek maliyet, teknik ekip ve sürekli bakım gerektirir; ayrıca müşterilerinizi o uygulamayı indirmeye ikna etmeniz gerekir. trinQ'da panel hazır, uygulama yayında ve kullanıcı tabanı ortak — tek uygulamada çevresindeki tüm işletmeleri gezen bir kullanıcı sizi de görür.",
  },
  {
    q: "Müşteri verileri kime ait, KVKK uyumlu mu?",
    a: "Veriler KVKK kapsamında, aydınlatma ve açık rıza metinlerimizde belirtilen esaslara göre işlenir. Müşteri verilerini üçüncü taraflara satmıyoruz. Ayrıntılar için KVKK Aydınlatma Metni ve Gizlilik Politikası sayfalarımıza bakabilirsiniz.",
  },
  {
    q: "İstediğim zaman ayrılabilir miyim?",
    a: "Evet. Cayma bedeli ya da gizli ücret yok. Ayrılmak istediğinizde işletme sayfanızı ve kampanyalarınızı yayından kaldırıyoruz.",
  },
];

const USER_FAQ: { q: string; a: string }[] = [
  {
    q: "trinQ nedir?",
    a: "trinQ, çevrendeki kafe ve restoranların kampanyalarını tek yerde gösteren ve bu mekânlarda damga biriktirmeni sağlayan bir uygulamadır. Karton damga kartı yerine kartların telefonunda durur.",
  },
  {
    q: "Uygulama ücretli mi?",
    a: "Hayır. trinQ kullanıcılar için tamamen ücretsizdir; kampanyalardan yararlanmak için herhangi bir ödeme yapman gerekmez.",
  },
  {
    q: "Damga ve ödül nasıl kazanılır?",
    a: "Anlaşmalı işletmelerde alışveriş yaptıktan sonra kasadaki QR kodu okutarak veya 6 haneli kodu girerek damga kazanırsın. Her işletmenin ödül kuralları uygulama içinde açıkça belirtilir.",
  },
  {
    q: "Hangi işletmeler trinQ kullanıyor?",
    a: "trinQ yeme-içme işletmelerine odaklanıyor: kafeler, restoranlar, kahveciler, brunch mekânları, pastaneler ve fırınlar. Uygulamadaki harita üzerinden yakınındaki anlaşmalı mekânları keşfedebilirsin.",
  },
  {
    q: "Öğrenci kampanyaları nasıl çalışıyor?",
    a: "Bazı işletmeler yalnızca öğrencilere yönelik kampanyalar tanımlıyor. Bu kampanyalar uygulamada ayrıca etiketlenir; kullanım koşulları kampanya detayında yazar.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Tüm kullanıcı verileri şifreli olarak saklanır ve KVKK uyumlu çalışırız. İstediğin zaman hesabını ve tüm verilerini silebilirsin.",
  },
];

export default function FAQSection({
  audience = "business",
}: {
  audience?: Audience;
}) {
  const items = audience === "business" ? BUSINESS_FAQ : USER_FAQ;
  const [open, setOpen] = useState<string | null>(items[0].q);

  return (
    <Section id="sss" tone="paper">
      <SectionHeading
        eyebrow="S.S.S."
        title="Sıkça sorulan sorular"
        subtitle={
          audience === "business"
            ? "Ücretlendirme, kurulum, kampanya yönetimi ve pilot sonrasıyla ilgili bilmek isteyebileceğiniz her şey."
            : "Uygulamayla ilgili merak ettiklerinin yanıtları burada."
        }
      />

      <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
        <div className="overflow-hidden rounded-[22px] border border-trinq-line bg-white shadow-[var(--shadow-sm)]">
          {items.map((item, i) => {
            const isOpen = open === item.q;
            return (
              <div key={item.q} className={i > 0 ? "border-t border-trinq-line" : ""}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-trinq-navy-soft/50 sm:px-7"
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="text-[15px] font-bold tracking-tight text-trinq-navy sm:text-base">
                      {item.q}
                    </span>
                    <motion.span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trinq-navy-soft text-trinq-navy"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Plus size={16} strokeWidth={2.4} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="t-body px-5 pb-6 pr-12 text-trinq-muted sm:px-7 sm:pr-16">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal variant="up" delay={0.1} className="mt-8 text-center">
          <p className="t-body text-trinq-muted">
            Cevabını bulamadığınız bir soru mu var?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-bold text-trinq-navy underline decoration-trinq-gold decoration-2 underline-offset-4 transition-colors hover:text-trinq-navy-mid"
            >
              Bize yazın
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
