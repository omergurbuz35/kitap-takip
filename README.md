# Kitap Takip Uygulaması

React tabanlı Vite ile geliştirilmiş, LocalStorage ve arayüz yönetimi entegrasyonlu CRUD uygulaması.

### 🚀 Özellikler

- ✅ LocalStorage ile veri persist etme
- ✅ Yeni kitap ekleme (Form)
- ✅ Kitap silme
- ✅ Okuma durumu ve sayfa güncelleme
- ✅ Arama ve kategori filtreleme
- ✅ TypeScript desteği
- ✅ Netlify'a deploy edilebilir

### 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

### 🌐 Deploy (Netlify)

1. GitHub'a push et
2. Netlify'da "New site from Git" seç
3. GitHub reposunu bağla
4. Build komutu: `npm run build`
5. Publish dizini: `dist`

Veya Netlify CLI ile:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 📁 Proje Yapısı

```text
src/
├── components/
│   ├── BookStats.tsx    # İstatistik paneli
│   ├── BookForm.tsx     # Ekleme formu
│   └── BookList.tsx     # Liste görünümü
├── interfaces/
│   └── book.ts          # TypeScript tipleri
├── App.tsx              # Uygulama kökü (CRUD işlemleri)
├── main.tsx             # React başlangıç noktası
└── index.css            # Stiller
```

### 🔧 Teknolojiler

- React - Frontend kütüphanesi
- TypeScript - Tip güvenliği
- Tailwind CSS - UI stillendirme
- Vite - Build tool
- Netlify - Hosting

### 📄 Veri Depolama

Tarayıcı tabanlı LocalStorage kullanılmaktadır:

- Key: `books_library_data`

### 🧑‍💻 Geliştirici

Ömer Gürbüz - Web Geliştirme Projesi
