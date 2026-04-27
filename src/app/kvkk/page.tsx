import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "KVKK Aydınlatma Metni | trinQ",
  description: "Kişisel Verilerin Korunması Kanunu Aydınlatma Metni",
};

export default function KVKKPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 font-heading">KVKK Aydınlatma Metni</h1>
            
            <div className="text-slate-600 leading-relaxed text-base">
              <p className="mb-6"><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
              <p className="mb-6">
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla trinQ Teknoloji A.Ş. ("Şirket") tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
              
              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Kişisel Verilerin İşlenme Amacı</h2>
              <p className="mb-6">
                Kişisel verileriniz, şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, ürün ve hizmetlerimizin kişiselleştirilerek sizlere sunulması, ticari ve hukuki güvenliğin temin edilmesi amaçlarıyla KVKK'nın 5. ve 6. maddelerinde belirtilen şartlara uygun olarak işlenmektedir.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. İşlenen Verilerin Aktarımı</h2>
              <p className="mb-6">
                Kişisel verileriniz, yukarıdaki amaçlar doğrultusunda iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurum ve kuruluşlarına KVKK'nın 8. ve 9. maddelerinde belirtilen çerçevede aktarılabilecektir.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Veri Toplama Yöntemi ve Hukuki Sebebi</h2>
              <p className="mb-6">
                Kişisel verileriniz platformumuz (uygulama ve web sitesi) üzerinden elektronik ortamda, mevzuattan doğan yasal yükümlülüklerimizin yerine getirilmesi hukuki sebebine dayanılarak toplanmaktadır.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Haklarınız</h2>
              <p className="mb-6">
                KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak kendinizle ilgili bilgi talep etme, verilerinizin amacına uygun kullanılıp kullanılmadığını öğrenme ve eksik/yanlış işlenmişse düzeltilmesini isteme haklarına sahipsiniz. İletişim için: info@trinq.app
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
