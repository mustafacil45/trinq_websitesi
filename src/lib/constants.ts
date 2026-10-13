/**
 * App Store / Google Play — Hero ve indirme CTA'sı buradan besleniyor.
 * Her iki link de canlı ve doğrulandı (200).
 *
 * Dil parametreleri (`l=tr`, `hl=tr`) yalnızca mağaza sayfasının dilini
 * sabitler; uygulamanın hangi ülkede yayında olduğunu değiştirmez.
 */
export const APP_STORE_URL = "https://apps.apple.com/tr/app/trinq/id6768079825?l=tr";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.trinqapp.trinq&hl=tr";

/**
 * Uygulama mağazalarda yayında mı?
 *
 * true  → resmî mağaza rozetleri, tıklayınca doğrudan mağazaya gider
 * false → "Yakında" butonları, tıklayınca Instagram notu gösterir
 *
 * Uygulama yayında olduğu için true. Bu anahtar ayrıca CTA bölümündeki
 * "çıkış tarihi" metnini de çeviriyor (bkz. CTASection).
 */
export const APP_IS_LIVE = true;

/**
 * İŞLETME TEKLİFİ — TEK KAYNAK.
 *
 * Sitede eskiden dört ayrı teklif dolaşıyordu: "Haziran'a özel 6 ay ücretsiz"
 * (tarihi geçmişti), "14 gün demo", "ücretsiz kurulum" ve "ücretsiz pilot".
 * Dördü aynı anda görününce ziyaretçi hangisinin geçerli olduğunu anlamıyordu.
 * Artık tek teklif var: ÜCRETSİZ PİLOT. Teklifi anlatan her bölüm (Hero,
 * PilotSection, FAQSection, ContactSection, CTASection) buradan besleniyor.
 *
 * NOT — süre bilinçli olarak yazılmıyor: ölçülmüş bir pilot penceresi
 * olmadığı için "3 ay / 6 ay" gibi bir sayı uydurmak yerine "pilot dönem
 * boyunca" deniyor ve bitişin önceden bildirileceği taahhüt ediliyor.
 * Süre netleşirse `duration` alanını doldurup metinlerde kullanmak yeterli.
 */
export const PILOT_OFFER = {
  /** Süre netleşirse doldur (ör. "3 ay"); null iken metinler "pilot dönem boyunca" der. */
  duration: null as string | null,

  /** Hero altındaki ikincil mesaj ve rozetlerde kullanılan kısa ifade. */
  shortNote: "Kafeler ve restoranlar için ücretsiz pilot katılımı.",

  /** Pilotta ücretsiz olan hizmetler — PilotSection ve SSS aynı listeyi kullanır. */
  includes: [
    "İşletme paneli ve kurulum",
    "Dijital damga kartı",
    "Sınırsız kampanya oluşturma",
    "Uygulamada ve haritada görünürlük",
  ],

  /** Pilot sonrası ücretlendirme politikası — tek cümlede, net. */
  pricingAfter:
    "Pilot sonunda ücretli plana geçiş opsiyoneldir. Komisyon almıyoruz; yalnızca sabit aylık abonelik uygulanır ve tutarı siz karar vermeden önce yazılı olarak paylaşırız.",
} as const;

export const CONTACT_EMAIL = "info@trinqapp.com";
export const INSTAGRAM_URL = "https://instagram.com/trinqapptr";
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/trinqapp/?viewAsMember=true";
export const BUSINESS_PANEL_URL = "https://kampanyapaneli.com";

export const COLORS = {
  /** Marka yeşili — eski "accent: #000000" kaldırıldı */
  accent: "#11392e",
  accentLight: "#244f42",
  dark: "#11392e",
  gold: "#c8a34a",
  muted: "#55665f",
  bg: "#F6F9F7",
} as const;
