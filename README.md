# 🏅 Spor Kursları Yönetim Sistemi

> Dijital çağın ruhuna uygun, oyunlaştırılmış ve tam kapsamlı bir spor topluluğu yönetim platformu. 🚀

**Spor Kursları Yönetim Sistemi**, hem kursiyerlerin kolayca kendilerine uygun sporu bulup başvuru yapabileceği hem de yöneticilerin salon, eğitmen ve kontenjan atamalarını tek noktadan organize edebileceği modern bir Full-Stack Web Uygulamasıdır. Proje, güncel teknolojiler kullanılarak "Minimalist & Gamified" (Oyunlaştırılmış ve Sade) bir UI felsefesiyle tasarlanmıştır.

---

## ✨ Öne Çıkan Özellikler

- **🎨 Oyunlaştırılmış Pastel Arayüz (Gamified UI):** 
  Sıradan formlar yerine, akıcı animasyonlar (Framer Motion), etkileşimli kartlar ve ferah bir "Pastel Green & Gold" renk paleti. Tıkladığınız her buton fiziksel bir tepki verir!
  
- **🌗 Karanlık Mod Desteği (Dark Mode):** 
  Göz yormayan pürüzsüz bir "Light Mode" varsayılan gelse de, dileyen kullanıcılar için sağ üstteki tek bir butonla "Dark Mode" deneyimine geçiş imkanı.

- **⚡ Server Actions ile Şimşek Hızında Backend:** 
  Next.js 15 mimarisiyle, ara bir API'ye ihtiyaç duymadan doğrudan formdan veritabanına akan güvenli ve tip korumalı veri akışı.

- **🛡️ Katı Doğrulama ve Mükerrer Kontrolü:** 
  Zod şemaları ile kusursuz form validasyonu. Sistem aynı TC kimlik numarasıyla aynı kursa çift başvuru yapılmasını zekice engeller. Dinamik kontenjan takibi ile dolan kurslar anında kilitlenir.

---

## 🛠️ Kullanılan Teknolojiler

Bu proje, bir "Senior Developer" titizliğiyle modern web ekosisteminin en güçlü araçları kullanılarak inşa edilmiştir:

### Frontend
- **Framework:** Next.js (App Router, React 19)
- **Stil & Tasarım:** Tailwind CSS v4, Lucide React (İkonlar)
- **Animasyon:** Framer Motion (60FPS Donanım Hızlandırmalı)
- **Tema Yönetimi:** next-themes (Hydration hatasız Light/Dark Mode)

### Backend & Veritabanı
- **ORM:** Prisma (Prisma 7 Adapter Mimarisi)
- **Veritabanı:** PostgreSQL (Supabase Hosting)
- **Validasyon:** Zod
- **Veri Akışı:** Next.js Server Actions (RPC Pattern)

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde test etmek çok kolay!

1. **Repoyu Klonlayın:**
   ```bash
   git clone https://github.com/ozgsl/Spor-Kulupleri-Website.git
   cd Spor-Kulupleri-Website
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın:**
   Kök dizinde bir `.env` dosyası oluşturun ve PostgreSQL veritabanı bağlantınızı ekleyin:
   ```env
   DATABASE_URL="postgresql://kullanici:sifre@host:port/veritabani"
   ```

4. **Veritabanını Hazırlayın:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed # (Varsayılan kurslar ve eğitmenler için)
   ```

5. **Uygulamayı Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek sistemi inceleyebilirsiniz!

---

## 📂 Proje Durumu ve Geliştirme Yol Haritası (Roadmap)

- [x] **Faz 1:** Temel Mimari ve Veritabanı Kurulumu
- [x] **Faz 2:** UI/UX Tasarım Sistemi (Gamification & Pastel Mod)
- [x] **Faz 3:** Dinamik Kursiyer Başvuru Formu (Kontenjan + Zod + Server Actions)
- [ ] **Faz 4:** Admin (Yönetici) Paneli ve Dashboard *(Sıradaki Aşama)*
- [ ] **Faz 5:** Oturum Açma (Authentication - NextAuth) ve Rol Yönetimi
- [ ] **Faz 6:** Canlıya Alma (Vercel Deploy)

---

*Bu proje; temiz kod (clean code), tek sorumluluk (single responsibility) prensibi ve modern UI/UX standartları gözetilerek staj/bitirme projesi standartlarında geliştirilmiştir. Geliştirme sürecinin tüm notlarına projeye ekli staj defteri (Markdown) dosyalarından ulaşabilirsiniz.* 💻☕
