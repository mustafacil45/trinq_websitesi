import LegalTextPage from "@/components/legal/LegalTextPage";

export const metadata = {
  title: "KVKK Aydınlatma Metni ve Açık Rıza Beyanı | Trinq",
  description: "Trinq Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni ve açık rıza beyanı",
};

const kvkkContent = `TRINQ
KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA
AYDINLATMA METNİ VE AÇIK RIZA BEYANI

Trinq; kullanıcıların katılımcı işletmelerde QR kod okutarak kampanya ve sadakat (damga kartı) avantajlarından yararlandığı, dijital fiş ve kampanya takibinin yapıldığı mobil platformu ("Platform") işleten Trinq, KVKK kapsamında kullanıcılara ait kişisel verileri işlemektedir. Bu aydınlatma metni, veri işleme faaliyetlerinin kapsamına, amaçlarını, hukuki sebeplerini ve kişisel veri sahiplerinin haklarını daha ayrıntılı ve açıklayıcı bir şekilde ortaya koymak üzere hazırlanmıştır. Kullanıcılar işletmede sunulan QR kodu okutarak kampanyaya katılır. Uygulamaya giriş ve hesap doğrulama telefon numarası ve SMS ile gönderilen tek kullanımlık doğrulama kodu (OTP) ile yapılır.

Veri Sorumluları: Onur Tezel (onurtezel@trinqapp.com), Mustafa Çil (mustafacil@trinqapp.com), Yusuf Aygün (yusufaygun@gmail.com)
Web Sitesi: trinqapp.com

• İŞLENEN KİŞİSEL VERİLER VE İŞLEME AMAÇLARI
Trinq tarafından işlenen kişisel veriler; platformun iletilmesi, kampanya ve sadakat hizmetlerinin sunulması ile yasal yükümlülüklerin yerine getirilmesi amacıyla sınırlı olmak üzere toplanmaktadır.
- Kimlik ve profil: Ad, soyad, cinsiyet, doğum tarihi, şehir (konum izni verildiğinde yaklaşık şehir olarak; profilden de girilebilir).
- İletişim: Telefon numarası.
- Teknik: Firebase Authentication kullanıcı kimliği, push bildirim tokeni (FCM/APNs), oturum bilgisi (JWT), cihaz tanımlayıcıları, bildirim tercihleri.
- Kullanım ve sadakat: QR okuma, kampanya ve damga kartı ilerlemesi, biriken ödül hakları, favori işletmeler, dijital fiş ve işlem özetleri (tutar, tarih, işletme, ürün/hizmet satırları).
- Konum: Yalnızca izin verilmesi hâlinde; sürekli konum takibi yapılmaz. Konum, şehir düzeyinde profile kaydedilebilir. Harita ve mağaza listesinde anlık konum cihazda kullanılabilir.

Kişisel verileriniz; uygulamaya kayıt/giriş sırasında, uygulama kullanımı sırasında ve işletim sistemi izin diyalogları aracılığıyla elektronik ortamda elde edilmektedir. Kanunun 5'inci maddesine dayalı olarak elde edilen kişisel verileriniz aşağıda belirtilen işleme amaçlarıyla bağlantılı, sınırlı ve ölçülü olarak izlenmektedir:
- Telefon numarasıyla OTP tabanlı kimlik doğrulama sürecinin yürütülmesi,
- Uygulamaya giriş ve oturum yönetiminin sağlanması (JWT, flutter_secure_storage),
- QR kod aracılığıyla kampanya doğrulama ve indirim uygulaması,
- Konum iznine ve bildirim iznine dayalı olarak, profilde kayıtlı şehir bilgisi ile uyumlu işletmelerin kampanya ve sadakat bildirimlerinin iletilmesi; uygulama içinde harita ve mağaza/kampanya listesinde mesafe filtresi ile yakın işletmelerin gösterilmesi,
- Damga kartı ve ödül hakkı süreçlerinin yürütülmesi,
- Dijital fişlerin kullanıcıya sunulması ve kampanya kullanım geçmişinin gösterilmesi,
- İşletme panelinde, yalnızca ilgili işletmeye ait özet müşteri ve kullanım istatistiklerinin üretilmesi,
- Kampanya kullanım geçmişinin kullanıcıya gösterilmesi ve kişiselleştirilmiş deneyim sunulması,
- Teknik bakım, performans takibi ve uygulama kararlılığının sağlanması,
- Her türlü talep, şikayet, soru ve görüşlerinizin karşılanması ve değerlendirilmesi,
- Faaliyetlerin yürürlükteki mevzuata uygun yürütülmesi,
- Gerekmesi hâlinde hukuken yetkili kurum ve kuruluşlara bilgi verilmesi, hukuk işlerinin takibi ve gereken durumlarda savunma hakkımızın kullanılması.

• UYGULAMA İZİNLERİ VE VERİ KATEGORİLERİ
Aşağıda, uygulamanın kullandığı izinler ile "işletim sistemi sistem diyaloğu" (OS) ve "uygulama içi akış" ayrımı belirtilmiştir:
- Kamera [OS izni]: QR kod okuma (mobile_scanner) — yalnızca QR tarama ekranı açıldığında devreye girer.
- Hassas/Kabaca Konum [OS izni]: Şehir bilgisinin profile kaydı; kampanya bildirimlerinde şehir eşleştirmesi. Liste mesafe filtresi.
- Bildirimler [OS izni]: OTP ve kampanya push bildirimleri (FCM/APNs).
- İnternet [manifest/otomatik]: Sunucu iletişimi, API erişimi — her zaman aktif.
- Firebase Authentication [uygulama içi]: Telefon numarasıyla kimlik doğrulama; SMS OTP akışı.
- FCM/APNs push token [uygulama içi]: Push bildirim altyapısı için cihaz tokeni.
- Güvenli depolama [uygulama içi]: JWT oturum tokeni (flutter_secure_storage).
- Tercih depolama [uygulama içi]: Bildirim tercihleri (shared_preferences + uygulama bildirim ayarları).
- SMS OTP [uygulama içi]: Giriş/kayıt için tek kullanımlık doğrulama kodu (Netgsm/Twilio). Kampanya kodu değildir.

• VERİ AKTARIMI
Trinq tarafından toplanan kişisel veriler, Kanun'un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları çerçevesinde aşağıdaki kişi ve kuruluşlara aktarılabilmektedir:
- Firebase / Google LLC: Kimlik doğrulama, push bildirim altyapısı (FCM) ve uzaktan yapılandırma hizmetleri amacıyla kişisel verileriniz bu tedarikçiye aktarılmaktadır.
- Netgsm / Twilio: OTP ve bildirim SMS'lerinin iletilmesi amacıyla telefon numaranız bu tedarikçilere aktarılmaktadır.
- Google LLC (Google Maps Platform): İşletme adresi ve harita yönlendirme.
- Barındırma hizmet sağlayıcısı (Hostinger — Frankfurt, Almanya): Platform verilerinin sunucularda saklanması.

Kişisel verileriniz, faaliyetlerin yürürlükteki mevzuata uygun yürütülmesi, hukuken yetkili kurum ve kuruluşlara bilgi verilmesi ve hukuk işlerinin takibi amacıyla ilgili bakanlıklar, mahkemeler, icra daireleri dahil hukuken yetkili özel kişi ve kuruluşlara ve hukuken yetkili kamu kurumlarına aktarılabilmektedir.

Yurt dışı aktarım: Kişisel verileriniz; kimlik doğrulama, push bildirim, SMS ve harita hizmetleri kapsamında yurt dışında (Almanya/Frankfurt ve Google/Twilio sunucuları) bulunan sunucularda izlenebilir. Bu aktarım, hizmetin sunulması için zorunlu olması ve KVKK m. 9 kapsamında gerekli güvencelerin sağlanması şartına bağlıdır.

Not: Katılımcı işletmeler, kampanya push bildiriminin hangi kullanıcıya gönderildiğini liste hâlinde göremez; yalnızca kampanya erişim ve kullanım istatistiklerine erişir. Buna ek olarak, yalnızca kendi işletmelerde gerçekleşen fiş ve kampanya kullanımlarına dayalı özet müşteri profilleri (maskelenmiş tanımlayıcı; tam telefon veya tam e-posta paylaşılmaz) işletme panelinde gösterilebilir. Doğum tarihi, işletmenin kendi doğum günü kampanyaları kapsamında izlenebilir.

• HUKUKİ SEBEP
Trinq tarafından yukarıda bahsedilen amaçlarla ve yöntemlerle toplanan kişisel veriler Kanun'un 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayalı olarak işlenebilmekte ve aktarılabilmektedir:
- Telefon numarasıyla kimlik doğrulama, kampanya aktivasyonu ve oturum yönetimine ilişkin kişisel verileriniz "sözleşmenin kurulması ve ifası" hukuki sebebine dayanılarak izlenmekte ve ilgili hizmet sağlayıcılara aktarılmaktadır.
- Profil şehir bilgisi, konum izni ve kampanya/sadakat push bildirimleri için kişisel verileriniz açık rızanıza dayanılarak işlenir ve Firebase/Google LLC'ye aktarılır. Konum iznini cihaz ayarlarından, bildirimleri uygulama içi bildirim ayarlarından kapatabilirsiniz.
- Kampanya bildirimleri öncelikle işletme ile kullanıcının aynı şehirde kayıtlı olması hâlinde iletilir; bu kitle bulunmazsa veya işletme şehri tanımlı değilse, ilgili işletmede daha önce fiş veya damga kartı işlemi yapmış kullanıcılara iletilebilir.
- Teknik altyapı (FCM token, depolama) ve performans takibine ilişkin kişisel verileriniz "meşru menfaatin bulunması" hukuki sebebine dayanılarak izlenmektedir.
- Faaliyetlerin mevzuata uygun yürütülmesi, yetkili kurumlara bilgi verilmesi ve hukuk işlerinin takibine ilişkin kişisel verileriniz "kanunlarda açıkça öngörülmesi", "hukuki yükümlülüklerin yerine getirilmesi" ve "bir hakkın tesisi, kullanılması veya korunması" hukuki sebeplerine dayanılarak izlenmekte ve ilgili kişi ve kuruluşlara aktarılmaktadır.
- Ticari elektronik ileti onayı, kayıt ekranındaki ayrı onay kutusu ile alınır. Onay, elektronik iletişim mevzuatı ve açık rıza kapsamında değerlendirilir; bu onay KVKK aydınlatma metninden bağımsızdır.

• SAKLAMA SÜRESİ
Kişisel verileriniz, hizmet süresince ve ilgili mevzuattaki zamanaşımı süreleri boyunca saklanır.
- Hesap silme: Uygulama içinden veya info@trinqapp.com adresine başvurarak hesabınızı silebilirsiniz. Talebiniz alındığında hesabınıza erişim derhal kapatılır; telefon ve oturum bilgileri devre dışı bırakılır. İlgili kayıtlar, yasal saklama yükümlülükleri saklı kalmak üzere en geç 30 gün içinde silinir, yok edilir veya kimliği belirlenemeyecek şekilde anonimleştirilir.
- Fiş ve kampanya kayıtları: Muhasebe, vergi ve uyuşmazlık süreleri için 5 yıla kadar saklanabilir; süre sonunda silinir veya anonimleştirilir.
- Kampanya kullanım verileri: Kampanya süresi + 2 yıl.
- Kullanım ve teknik loglar: 1 yıla kadar.
- OTP doğrulama kodları: Yalnızca doğrulama süresi boyunca 10 dakika tutulur; kalıcı arşivlenmez.

• KVKK KAPSAMINDA HAKLARINIZ
İlgili kişiler, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11'inci maddesi kapsamındaki taleplerini, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e göre veri sorumlusuna aşağıdaki e-posta adresi üzerinden iletebilir:
Veri Sorumluları İletişim: onurtezel@trinqapp.com, mustafacil@trinqapp.com, yusufaygun@gmail.com

Uygulama içi haklarınız kapsamında: Profil bilgilerinizi görüntüleyip güncelleyebilir; Ayarlar → Bildirimler üzerinden bildirim tercihlerinizi değiştirebilir; Hesabım → Hesabı sil ile hesap silme talebinde bulunabilirsiniz. Erişim, düzeltme, silme, izlemeyi kısıtlama ve itiraz talepleri yazılı olarak değerlendirilir. Otomatik toplu veri dışa aktarma (export) sunulmamaktadır; talep üzerine makul sürede yanıt verilir.

• AÇIK RIZA BEYANI
Trinq uygulamasını kullanmak istiyorum ve bu doğrultuda yukarıdaki aydınlatma metninde belirtilen şekilde kişisel verilerimin; Platform hizmetleri kapsamında profilimde tutulan şehir bilgisi ve bildirim tercihlerime göre kampanya/sadakat bildirimlerinin iletilmesi amacıyla Firebase / Google LLC'ye aktarılmasına ve bu kapsamda işlenmesine açık rıza veriyorum.

Bu uygulama, Firebase Authentication altyapısı kullanılarak telefon numaramı OTP yöntemiyle doğrulamaktadır. Bu doğrultuda uygulamayı kullanmaya devam etmemle birlikte, yukarıdaki aydınlatma metninde belirtilen şekilde telefon numaramın SMS OTP ile doğrulanması ve oturum yönetimi amacıyla kişisel verilerimin Firebase / Google LLC tarafından işlenmesine açık rıza veriyorum. Açık rızamı cihaz konum/bildirim izinleri, uygulama içi bildirim ayarları veya info@trinqapp.com adresine e-posta göndererek geri alabileceğimi, rızamı geri almamın geçmişte gerçekleştirilen işlemlerin hukuki geçerliliğini etkilemeyeceğini biliyorum.

Son Güncelleme: Mayıs 2026 | Trinq | info@trinqapp.com | http://trinqapp.com/kvkk`;

export default function KVKKPage() {
  return <LegalTextPage content={kvkkContent} />;
}
