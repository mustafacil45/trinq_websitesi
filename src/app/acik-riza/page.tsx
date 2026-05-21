import LegalTextPage from "@/components/legal/LegalTextPage";

export const metadata = {
  title: "Açık Rıza Beyanı | Trinq",
  description: "Trinq Kişisel Verilerin Korunması Kanunu kapsamında açık rıza beyanı",
};

const consentContent = `TRINQ
KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA
AÇIK RIZA BEYANI

Trinq uygulamasını kullanmak istiyorum ve bu doğrultuda yukarıdaki aydınlatma metninde belirtilen şekilde kişisel verilerimin; Platform hizmetleri kapsamında profilimde tutulan şehir bilgisi ve bildirim tercihlerime göre kampanya/sadakat bildirimlerinin iletilmesi amacıyla Firebase / Google LLC'ye aktarılmasına ve bu kapsamda işlenmesine açık rıza veriyorum.

Bu uygulama, Firebase Authentication altyapısı kullanılarak telefon numaramı OTP yöntemiyle doğrulamaktadır. Bu doğrultuda uygulamayı kullanmaya devam etmemle birlikte, yukarıdaki aydınlatma metninde belirtilen şekilde telefon numaramın SMS OTP ile doğrulanması ve oturum yönetimi amacıyla kişisel verilerimin Firebase / Google LLC tarafından işlenmesine açık rıza veriyorum. Açık rızamı cihaz konum/bildirim izinleri, uygulama içi bildirim ayarları veya info@trinqapp.com adresine e-posta göndererek geri alabileceğimi, rızamı geri almamın geçmişte gerçekleştirilen işlemlerin hukuki geçerliliğini etkilemeyeceğini biliyorum.

Veri Sorumluları İletişim: onurtezel@trinqapp.com, mustafacil@trinqapp.com, yusufaygun@gmail.com
Web Sitesi: trinqapp.com

Son Güncelleme: Mayıs 2026 | Trinq | info@trinqapp.com | http://trinqapp.com/acik-riza`;

export default function AcikRizaPage() {
  return <LegalTextPage content={consentContent} />;
}
