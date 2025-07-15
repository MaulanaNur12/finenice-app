# 🖥️ Finenice App - Frontend

**Finenice App** adalah aplikasi manajemen produk dan transaksi berbasis web yang dibangun dengan **React** sebagai frontend dan **Flask** sebagai backend. Dokumentasi ini merangkum petunjuk instalasi, struktur proyek, hingga fitur-fitur komponen utama.

---

## 📚 Dokumentasi Lengkap

Semua dokumentasi diletakkan di folder [`docs/`](./docs):

| File              | Deskripsi                                              |
| ----------------- | ------------------------------------------------------ |
| `overview.md`     | Gambaran umum aplikasi frontend                        |
| `structure.md`    | Struktur direktori dan file penting                    |
| `installation.md` | Panduan instalasi lokal                                |
| `docker.md`       | Build & jalankan dengan Docker                         |
| `kubernetes.md`   | Konfigurasi deployment di Kubernetes                   |
| `environment.md`  | Konfigurasi `.env` dan penggunaan `VITE_API_BASE`      |
| `auth.md`         | Penjelasan komponen Login dan Register                 |
| `products.md`     | Penjelasan komponen Products dan fitur admin           |
| `checkout.md`     | Penjelasan komponen Checkout dan cara kerjanya         |
| `transactions.md` | Komponen Transactions dan AllTransactions (user/admin) |
| `dashboard.md`    | Komponen Dashboard admin untuk CRUD produk             |
| `build.md`        | Perintah build production dan hasilnya                 |
| `license.md`      | Lisensi dan keterangan open-source                     |

---

## 🚀 Fitur Utama

* Login & Register dengan autentikasi JWT
* Melihat dan mengelola daftar produk
* Checkout dan transaksi produk
* Role-based access: user & admin
* Antarmuka modern dengan Tailwind CSS

---

## 🧰 Teknologi

* React + Vite
* Tailwind CSS
* Fetch API
* Docker & Kubernetes (opsional)

---

## 🔧 Instalasi Cepat

```bash
git clone https://github.com/MaulanaNur12/finenice-app.git
cd finenice-app/frontend
npm install
npm run dev
```

Buka aplikasi di: `http://localhost:5173`

---

## 🐳 Jalankan via Docker

```bash
docker build -t finenice-frontend .
docker run -d -p 3000:80 finenice-frontend
```

---

## 📄 Lisensi

Proyek ini menggunakan [MIT License](./docs/license.md) dan dapat digunakan bebas untuk keperluan belajar atau pengembangan.

---

📁 Lihat dokumentasi lengkap di folder [`docs/`](./docs)
