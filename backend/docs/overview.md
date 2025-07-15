# 🧠 Overview - Backend Finenice App

Backend Finenice App adalah REST API yang dikembangkan menggunakan **Python** dengan framework **Flask**. Aplikasi ini merupakan bagian dari sistem manajemen transaksi dan produk untuk platform Finenice.

Fitur utama dari backend ini meliputi:

- ✅ **Autentikasi dan Otorisasi**
  - Registrasi dan login pengguna
  - JSON Web Token (JWT) untuk autentikasi
  - Role-based access (user/admin)

- 📦 **Manajemen Produk**
  - Endpoint untuk melihat, menambah, mengedit, dan menghapus produk

- 💳 **Checkout dan Transaksi**
  - Proses checkout produk
  - Mencatat transaksi
  - Menampilkan riwayat transaksi pengguna dan semua transaksi (admin)

- 🌐 **API Terbuka dan Aman**
  - Didukung dengan CORS untuk integrasi frontend
  - Semua endpoint tertentu dilindungi dengan JWT

- 🛠️ **Terintegrasi dengan:**
  - **MySQL** sebagai basis data
  - **Docker** untuk containerisasi
  - **Kubernetes** untuk deployment skala produksi

---

## 📈 Arsitektur Singkat

```text
Frontend (React)
       │
    [CORS]
       │
  Flask Backend API
       │
    MySQL Database

🎯 Tujuan
Proyek ini dikembangkan sebagai sistem backend modular untuk aplikasi manajemen produk dan transaksi, serta dirancang untuk:

Meningkatkan pembelajaran pengembangan REST API

Memberikan fondasi kuat untuk pengembangan sistem POS skala kecil

Mendukung deployment berbasis container dan cloud-native (Kubernetes)

🔒 Keamanan
Token JWT untuk autentikasi user

Role-based access control (admin vs user)

Validasi input di endpoint login/register dan produk

🧪 Status
🟢 Stable – Telah diuji secara lokal, Docker, dan di lingkungan Kubernetes.