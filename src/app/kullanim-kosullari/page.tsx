import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kullanım Koşulları | trinQ",
  description: "trinQ platformu kullanım koşulları ve şartları",
};

export default function KullanimKosullariPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-12">
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:mb-8">Kullanım Koşulları</h1>
            
            <div className="text-slate-600 leading-relaxed text-base">
              <p className="mb-6"><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
              
              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Taraflar ve Konu</h2>
              <p className="mb-6">
                Bu kullanım koşulları ("Sözleşme"), trinQ platformuna üye olan kullanıcılar ile trinQ Teknoloji A.Ş. arasındaki hizmet şartlarını belirler. Kayıt olmanız bu şartları kabul ettiğiniz anlamına gelir.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Hizmetin Kapsamı</h2>
              <p className="mb-6">
                trinQ, dijital fişlerinizi tek bir noktada toplamanızı, anlaşmalı kurumlardaki alışverişlerinizden sadakat puanları/damgalar kazanmanızı sağlayan aracı bir teknoloji platformudur. trinQ, mağazaların sunduğu kampanyaların veya ödüllerin içeriğinden doğrudan sorumlu değildir.
              </p>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Kullanıcı Yükümlülükleri</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Hesap güvenliğinizden tamamen siz sorumlusunuz. Şifrenizi üçüncü kişilerle paylaşmayınız.</li>
                <li>Sistemdeki açıkları kötüye kullanmak, sahte fiş üretmek/tanıtmak kesinlikle yasaktır ve hukuki işlem sebebidir.</li>
                <li>Uygulamayı Türkiye Cumhuriyeti yasalarına uygun olarak kullanmayı taahhüt edersiniz.</li>
              </ul>

              <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Hizmet Kesintileri</h2>
              <p className="mb-6">
                Platformun bakım ve güncellemeleri nedeniyle zaman zaman kesintiler yaşanabilir. trinQ, kesintisiz hizmet garantisi vermemektedir ve olası veri veya hak kayıplarından sorumlu tutulamaz.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
