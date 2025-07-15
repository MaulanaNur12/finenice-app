# 🗂️ structure.md

## 📁 Struktur Direktori Frontend

Berikut adalah struktur utama dari proyek frontend **Finenice App**:

```
frontend/
├── Dockerfile              # Build image frontend untuk produksi
├── build/                  # Output build (jika menggunakan React CLI)
├── public/                 # File publik seperti index.html
├── src/                    # Semua source code aplikasi React
│   ├── components/         # Komponen UI (card, form, table, dll.)
│   ├── pages/              # Halaman utama (Login, Produk, Checkout, dll.)
│   └── App.jsx             # Entry utama aplikasi (routing dan layout)
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── postcss.config.js       # Konfigurasi untuk PostCSS
├── package.json            # Daftar dependencies dan scripts npm
└── README.md               # Dokumentasi umum proyek
```

---

## 📦 Struktur Folder `src/`

| Folder        | Deskripsi                                                |
| ------------- | -------------------------------------------------------- |
| `components/` | Komponen UI reusable seperti form, tombol, layout, dll.  |
| `pages/`      | Setiap file di sini merepresentasikan satu halaman utama |
| `App.jsx`     | Komponen utama yang mengatur routing dan wrapper umum    |

---

## 🧾 File Penting

| File                 | Fungsi                                                          |
| -------------------- | --------------------------------------------------------------- |
| `Dockerfile`         | Digunakan untuk membuat image frontend berbasis Node + Nginx    |
| `tailwind.config.js` | Konfigurasi Tailwind (extend theme, plugin, dsb.)               |
| `package.json`       | Dependency list, script build/dev, serta metadata proyek        |
| `.env`               | Menyimpan environment variable lokal (tidak di-commit)          |
| `default.conf`       | Konfigurasi Nginx untuk serve SPA React dengan fallback routing |

---

Struktur ini dibuat agar modular, mudah dikembangkan, dan memisahkan logika tampilan per halaman atau fitur.
