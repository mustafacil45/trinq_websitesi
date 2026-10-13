"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_IS_LIVE, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

/* -------------------------------------------------------------------------- *
 * Mağaza simgeleri
 *
 * Önceden lucide'ın genel `Apple` / `Play` ikonları kullanılıyordu; ikisi de
 * mağazaların gerçek simgesi değil (lucide'ınki içi boş bir elma konturu ve
 * tek renk bir oynat üçgeni). Aşağıdaki path'ler Apple ve Google'ın resmî
 * rozet SVG'lerinden (public/badges/) birebir çıkarıldı, viewBox'lar
 * getBBox ile ölçülüp simgeye sıfırlandı.
 * -------------------------------------------------------------------------- */

/** Apple logosu — buton metniyle aynı rengi alsın diye currentColor. */
function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="12.79 6.21 20.76 25.52"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M30.128,19.784c-0.029-3.223,2.639-4.791,2.761-4.864c-1.511-2.203-3.853-2.504-4.676-2.528 c-1.967-0.207-3.875,1.177-4.877,1.177c-1.022,0-2.565-1.157-4.228-1.123c-2.14,0.033-4.142,1.272-5.24,3.196 c-2.266,3.923-0.576,9.688,1.595,12.859c1.086,1.553,2.355,3.287,4.016,3.226c1.625-0.067,2.232-1.036,4.193-1.036 c1.943,0,2.513,1.036,4.207,0.997c1.744-0.028,2.842-1.56,3.89-3.127c1.255-1.78,1.759-3.533,1.779-3.623 C33.507,24.924,30.161,23.647,30.128,19.784z" />
      <path d="M26.928,10.306c0.874-1.093,1.472-2.58,1.306-4.089c-1.265,0.056-2.847,0.875-3.758,1.944 c-0.806,0.942-1.526,2.486-1.34,3.938C24.557,12.205,26.016,11.382,26.928,10.306z" />
    </svg>
  );
}

/** Google Play üçgeni — dört resmî renk, tema ne olursa olsun sabit. */
function GooglePlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="13.29 9.52 30.69 34.3"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        fill="#eb3131"
        d="m27.622 25.899-14.194 15.066c5.34e-4 0.0031 0.0016 0.0057 0.0021 0.0089 0.43532 1.636 1.9296 2.8406 3.703 2.8406 0.70892 0 1.3745-0.19166 1.9453-0.52812l0.04533-0.02656 15.978-9.22-7.479-8.141"
      />
      <path
        fill="#f6b60b"
        d="m41.983 23.334-0.0136-0.0093-6.8982-3.999-7.7717 6.9156 7.7987 7.7977 6.8618-3.9592c1.203-0.64945 2.0197-1.9177 2.0197-3.3802 0-1.452-0.80571-2.7139-1.9968-3.3655"
      />
      <path
        fill="#5778c5"
        d="m13.426 12.37c-0.08533 0.31466-0.13018 0.64425-0.13018 0.98651v26.623c0 0.34162 0.04432 0.67233 0.13072 0.98587l14.684-14.681-14.684-13.914"
      />
      <path
        fill="#3bad49"
        d="m27.727 26.668 7.3473-7.3451-15.96-9.2534c-0.58012-0.34746-1.2572-0.54799-1.9817-0.54799-1.7734 0-3.2697 1.2068-3.7051 2.8447-5.34e-4 0.0016-5.34e-4 0.0027-5.34e-4 0.0041l14.3 14.298"
      />
    </svg>
  );
}

/**
 * Mağaza rozetleri — iki durumu var, tek anahtar: `APP_IS_LIVE`.
 *
 *   true  → resmî App Store / Google Play rozetleri, tıklayınca doğrudan
 *           mağazaya yönlendirir. "Yakında" ibaresi hiçbir yerde görünmez.
 *   false → "Yakında" butonları; tıklayınca bloklayan `window.alert` yerine
 *           satır içi bir not gösterir.
 *
 * Uygulama yayında olduğu için anahtar `true` ve "Yakında" ibaresi hiçbir
 * yerde görünmüyor; linkler lib/constants.ts'te ve doğrulandı. Aşağıdaki
 * "Yakında" dalı, ileride bir mağazadan kaldırma/yeniden yayın durumunda
 * geri dönülebilsin diye duruyor.
 *
 * NOT: Bu rozetler ana sayfada KULLANILMIYOR. İşletme kazanımına odaklanan
 * ana sayfada indirme butonu başvuru CTA'sıyla yarışıyordu; rozetler artık
 * yalnızca /kullanicilar sayfasında (hero ve indirme CTA'sı) görünüyor.
 */
export default function StoreBadges({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const [note, setNote] = useState(false);

  const base =
    "inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-5 text-left transition-all duration-200";

  const skin =
    tone === "dark"
      ? "border border-white/18 bg-white/8 text-[#f6f7ef] hover:border-white/32 hover:bg-white/12"
      : "border border-trinq-line bg-white text-trinq-navy hover:border-trinq-navy/25 hover:shadow-[var(--shadow-md)]";

  /*
   * YAYINDA: resmî mağaza rozetleri, tıklayınca doğrudan mağazaya gider.
   * Apple'ın pazarlama kuralları mağazaya link veren öğede kendi rozet
   * görselini şart koşuyor; bu yüzden burada özel buton değil rozet var.
   * İki rozetin en-boy oranı da aynı (3.375), bu yüzden aynı yükseklikte
   * aynı genişliğe oturuyorlar.
   */
  if (APP_IS_LIVE) {
    const link =
      "inline-flex rounded-[10px] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4";

    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={link}>
          <img
            src="/badges/app-store-badge.svg"
            alt="App Store'dan indirin"
            /* dar telefonlarda (375–390px) iki rozet yan yana sığsın */
            className="h-[46px] w-auto sm:h-[52px]"
            width={176}
            height={52}
          />
        </a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={link}>
          <img
            src="/badges/google-play-badge.svg"
            alt="Google Play'den edinin"
            /* dar telefonlarda (375–390px) iki rozet yan yana sığsın */
            className="h-[46px] w-auto sm:h-[52px]"
            width={176}
            height={52}
          />
        </a>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col gap-3 sm:w-auto ${className}`}>
      {/* Mobilde de YAN YANA: alt alta iki tam genişlik buton, hero'daki
          ürün görselini katlanın altına itiyordu. İkisi de ikon + kısa
          etiket olduğu için dar ekranda da rahat sığıyorlar. */}
      <div className="flex w-full gap-3 sm:w-auto">
        <button type="button" onClick={() => setNote(true)} className={`${base} ${skin} flex-1 sm:flex-none`}>
          <AppleLogo className="h-[23px] w-auto shrink-0" />
          <span className="leading-none">
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] opacity-60">
              Yakında
            </span>
            <span className="mt-1 block text-[15px] font-bold tracking-tight">App Store</span>
          </span>
        </button>

        <button type="button" onClick={() => setNote(true)} className={`${base} ${skin} flex-1 sm:flex-none`}>
          <GooglePlayIcon className="h-[21px] w-auto shrink-0" />
          <span className="leading-none">
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] opacity-60">
              Yakında
            </span>
            <span className="mt-1 block text-[15px] font-bold tracking-tight">Google Play</span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {note && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`text-[13px] font-medium ${
              tone === "dark" ? "text-trinq-gold-soft" : "text-trinq-navy-mid"
            }`}
          >
            Uygulama çok yakında yayında — haberdar olmak için{" "}
            <a
              href="https://instagram.com/trinqapptr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              @trinqapptr
            </a>
            &apos;ı takip et.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
