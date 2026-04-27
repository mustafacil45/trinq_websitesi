/** Mock catalog for “Ürünleri Seç” and menülü kategori hedefleme */
export const MOCK_MENU_PRODUCTS = [
  { id: "p-1", name: "Americano", category: "İçecekler", price: 85 },
  { id: "p-2", name: "Cappuccino", category: "İçecekler", price: 95 },
  { id: "p-3", name: "Cheesecake dilim", category: "Tatlılar", price: 120 },
  { id: "p-4", name: "Kruvasan", category: "Fırın", price: 55 },
  { id: "p-5", name: "Menemen", category: "Ana Yemek", price: 180 },
  { id: "p-6", name: "Tost", category: "Atıştırmalık", price: 90 },
] as const;

export const MOCK_MENU_CATEGORIES = [
  { id: "c-1", name: "İçecekler" },
  { id: "c-2", name: "Tatlılar" },
  { id: "c-3", name: "Fırın" },
  { id: "c-4", name: "Ana Yemek" },
  { id: "c-5", name: "Atıştırmalık" },
] as const;

/** Panel sihirbazı — siyah / nötr önizleme */
export const WIZARD_THEME = {
  ink: "#0a0a0a",
  inkRgb: "10,10,10",
  accent: "#171717",
  accentRgb: "23,23,23",
} as const;
