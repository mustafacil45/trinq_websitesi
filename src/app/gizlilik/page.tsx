import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gizlilik Politikası | trinQ",
  description: "trinQ kullanıcı gizlilik ve veri koruma politikası",
};

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 font-heading">Gizlilik Politikası</h1>
            
            <div className="text-slate-600 leading-relaxed text-base">
              <p className="mb-6"><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
              
              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Verilerin Korunmasına Yönelik Taahhüdümüz</h2>
              <p className="mb-6">
                trinQ olarak kişisel verilerinizin güvenliğine en üst seviyede önem veriyoruz. Bu politika, uygulamamızı ve sitemizi kullandığınızda bilgilerinizin nasıl güvende tutulduğunu açıklamaktadır.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Veri Güvenliği Standartları</h2>
              <p className="mb-6">
                Hizmetlerimizi sunarken toplanan alışveriş fişi verileriniz, lokasyon bilgileriniz ve temel kullanıcı verileriniz modern kriptografi ve şifreleme (SSL/TLS) yöntemleriyle korunmaktadır. Veritabanlarımız sürekli olarak denetlenmekte ve endüstri standartlarında güvenlik duvarlarıyla saklanmaktadır.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Üçüncü Kişilerle Paylaşım</h2>
              <p className="mb-6">
                Alışveriş verileriniz, anlaşmalı markalarla sadece anonimleştirilmiş (kimlikten arındırılmış) analitik istatistikler formatında paylaşılabilir. Size ait fiş dökümü, e-posta veya telefon bilgileriniz açık rızanız olmadan doğrudan pazarlama firmalarına <strong>satılmaz.</strong>
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Uygulama İçi İzinler</h2>
              <p className="mb-6">
                trinQ mobil uygulaması cihazınızda kamera (QR okutma için) ve bildirim izinleri isteyebilir. Bu izinler sadece ilgili özelliğin kullanımı sırasında devreye girer ve amacının dışında kişisel veri toplamak için kullanılamaz.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
