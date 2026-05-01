import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Çerez Politikası | trinQ",
  description: "Web sitemizde ve uygulamamızda kullanılan çerezler hakkında bilgi",
};

export default function CerezPolitikasiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-12">
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:mb-8">Çerez Politikası</h1>
            
            <div className="text-slate-600 leading-relaxed text-base">
              <p className="mb-6"><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
              <p className="mb-6">
                trinQ Teknoloji A.Ş. olarak, web sitemiz (trinq.app) ve uygulamamızda kullanıcı deneyimini iyileştirmek ve güvenli bir hizmet sunmak amacıyla çerezler (cookies) kullanmaktayız.
              </p>
              
              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Çerez Nedir?</h2>
              <p className="mb-6">
                Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Sitelerin daha verimli çalışmasını sağlar.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Hangi Çerezleri Kullanıyoruz?</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><strong>Zorunlu Çerezler:</strong> Platformun temel fonksiyonlarının çalışması için elzemdir. Kapatılamazlar.</li>
                <li><strong>Performans ve Analiz Çerezleri:</strong> Uygulamanın nasıl kullanıldığını analiz ederek performansı artırmamıza yardımcı olur. (örn. Google Analytics)</li>
                <li><strong>İşlevsellik Çerezleri:</strong> Dil ve bölge gibi tercihlerinizi hatırlamamızı sağlar.</li>
              </ul>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Çerez Yönetimi</h2>
              <p className="mb-6">
                Tarayıcı ayarlarınızı değiştirerek çerezlere ilişkin tercihlerinizi yönetebilirsiniz. Ancak zorunlu çerezleri engellemeniz durumunda sitemizin bazı fonksiyonları düzgün çalışmayabilir.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
