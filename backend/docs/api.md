# 📡 Dokumentasi API - Backend Finenice App

Berikut adalah daftar lengkap endpoint API yang tersedia dalam backend Finenice App, beserta metode HTTP, kebutuhan autentikasi, dan deskripsinya.

---

## 🔐 Autentikasi

| Endpoint         | Method | Auth | Deskripsi                |
|------------------|--------|------|---------------------------|
| `/auth/register` | POST   | ❌   | Registrasi user baru      |
| `/auth/login`    | POST   | ❌   | Login dan dapatkan JWT    |

---

## 📦 Produk

| Endpoint              | Method | Auth  | Deskripsi                         |
|-----------------------|--------|-------|------------------------------------|
| `/products`           | GET    | ❌    | Lihat semua produk                 |
| `/products`           | POST   | ✅ Admin | Tambah produk baru               |
| `/products/<id>`      | PUT    | ✅ Admin | Edit produk berdasarkan ID       |
| `/products/<id>`      | DELETE | ✅ Admin | Hapus produk berdasarkan ID      |

---

## 🛒 Checkout & Transaksi

| Endpoint               | Method | Auth     | Deskripsi                              |
|------------------------|--------|----------|-----------------------------------------|
| `/checkout`            | POST   | ✅ User  | Checkout produk dan buat transaksi      |
| `/transactions`        | GET    | ✅ User  | Lihat transaksi milik user              |
| `/transactions/all`    | GET    | ✅ Admin | Lihat semua transaksi di sistem         |

---

## 🔐 Tentang Autentikasi

- Token JWT dikirim melalui header:

Authorization: Bearer <token>



- Role pengguna (`user` atau `admin`) disimpan di dalam token dan digunakan untuk membatasi akses endpoint.

---

## 📋 Contoh Response: Login

json
{
"access_token": "eyJ0eXAiOiJKV1QiLCJh..."
}
Gunakan token ini dalam header setiap request yang memerlukan autentikasi.

🧾 Catatan Tambahan
Semua endpoint merespons dalam format JSON.

Field pada request body harus sesuai skema yang telah ditentukan (misalnya saat login, register, tambah produk, dll).

Kesalahan umum akan mengembalikan kode status dan pesan error yang deskriptif.