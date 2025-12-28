# northosintlibrary
North's OSINT Library

Yerel kullanım için derlenmiş OSINT araçları kataloğu ve hızlı araştırma sayfası.

**Yapımcı:** rootnorth
**Site:** https://north.cc.cc

Bu proje, akademik/ders sunumları ve kişisel araştırmalar için hızlıca çalıştırılabilecek, statik bir OSINT (Açık Kaynak İstihbaratı) araç kataloğudur. Tüm veriler `tools.json` içinde tutulur; arayüz `index.html` ile sağlanır.

## İçindekiler

- `index.html` — Kullanıcı arayüzü
- `styles.css` — Stil dosyası
- `scripts.js` — Arama, filtre ve CSV dışa aktarma işlevleri
- `tools.json` — Araç veritabanı (isim, açıklama, kategori, url)
- `categories_summary.json` — Araç veritabanı sayıları


## Çalıştırma
cd [dosya konumu]
python -m http.server 8000
# sonra tarayıcıda http://localhost:8000 aç
## Gizlilik & Etik

Bu katalog, çeşitli üçüncü taraf araçlara bağlantılar içerir. Araçları kullanırken yerel kanunlara, hizmet şartlarına ve etik kurallara uyun. Herhangi bir kişisel veriyi (izinsiz) toplamak veya kötüye kullanmak yasadışıdır.

## Katkılar

Proje şu an yerel kullanım için hazırlanmıştır.

## İletişim

Yapımcı: rootnorth — https://north.cc.cc
