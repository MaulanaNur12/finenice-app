# 🛠️ installation.md

## 📥 Instalasi Lokal Frontend

Langkah-langkah untuk menjalankan frontend **Finenice App** di lingkungan lokal.

---

### 1. Clone Repository

```bash
git clone https://github.com/MaulanaNur12/finenice-app.git
cd finenice-app/frontend
```

---

### 2. Install Dependency

```bash
npm install
```

---

### 3. Jalankan Aplikasi

```bash
npm run dev
```

Secara default, aplikasi akan berjalan di:

```
http://localhost:5173/
```

> Pastikan backend (Flask API) juga sudah berjalan di `http://localhost:5000` atau sesuaikan base URL di konfigurasi `.env`.

---

## 🧪 Validasi Setelah Jalan

* Halaman login dapat diakses.
* Fetch produk bekerja dan menampilkan daftar produk.
* Register, Login, dan Checkout berjalan normal.
* Console tidak menunjukkan error fetch API.

---

## 🐞 Troubleshooting

| Masalah                      | Solusi                                                        |
| ---------------------------- | ------------------------------------------------------------- |
| Fetch API gagal / CORS error | Pastikan backend mengaktifkan CORS dan berjalan di port benar |
| Halaman kosong saat refresh  | Cek konfigurasi Nginx jika menggunakan versi production       |
| Port 5173 sudah dipakai      | Jalankan dengan port lain: `npm run dev -- --port=3000`       |

---

Aplikasi siap digunakan untuk pengembangan frontend secara lokal.
