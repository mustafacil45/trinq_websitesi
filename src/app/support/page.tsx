import LegalTextPage from "@/components/legal/LegalTextPage";

export const metadata = {
  title: "Destek (Support) | Trinq",
  description: "Trinq destek ve iletişim bilgileri",
};

const supportContent = `TRINQ
DESTEK (SUPPORT)

Trinq uygulaması, kullanıcı hesabı, kampanyalar, dijital fişler, QR işlemleri, işletme paneli veya veri haklarınızla ilgili destek talepleriniz için bizimle iletişime geçebilirsiniz.

Destek E-posta: info@trinqapp.com
Web Sitesi: trinqapp.com

Destek taleplerinizde adınızı, iletişim bilginizi, yaşadığınız sorunun kısa açıklamasını ve varsa ilgili ekran görüntüsü veya işlem bilgisini paylaşmanız sürecin daha hızlı ilerlemesine yardımcı olur.

Hesap silme, kişisel veri talepleri, açık rıza geri alma ve KVKK kapsamındaki başvurularınızı da info@trinqapp.com adresi üzerinden iletebilirsiniz.

Son Güncelleme: Mayıs 2026 | Trinq | info@trinqapp.com | http://trinqapp.com/support`;

export default function SupportPage() {
  return <LegalTextPage content={supportContent} />;
}
