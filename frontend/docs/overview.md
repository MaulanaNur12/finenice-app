# 🧭 overview\.md

## 📌 Ringkasan

Frontend dari **Finenice App** adalah antarmuka pengguna berbasis web yang dibangun dengan **React**. Aplikasi ini terhubung ke backend **Flask API** dan menyediakan fitur utama seperti:

* Autentikasi pengguna (Login & Register)
* Menampilkan daftar produk
* Checkout produk
* Melihat riwayat transaksi (user)
* Mengelola produk & transaksi (admin)

Frontend ini juga dirancang untuk fleksibel dijalankan secara:

* Lokal (development server)
* Docker container
* Deployment ke Kubernetes cluster

---

## 🛠 Teknologi yang Digunakan

* **React**: Framework utama untuk membangun UI
* **Tailwind CSS**: Styling yang efisien dan utility-first
* **Vite**: Dev server & bundler (jika digunakan)
* **Fetch API**: Untuk komunikasi dengan backend
* **Docker + Nginx**: Untuk build dan serve versi produksi

---

## 🔐 Peran & Akses

| Peran | Akses Fitur                                                                |
| ----- | -------------------------------------------------------------------------- |
| User  | Lihat produk, checkout, lihat transaksi pribadi                            |
| Admin | Semua fitur user + kelola produk + lihat seluruh transaksi dari semua user |

---

## 🧪 Testing Manual

Karena tidak menggunakan framework testing frontend otomatis, validasi dilakukan secara manual melalui:

* Cek visual semua halaman (Login, Produk, Checkout, Dashboard, dll.)
* Tes interaksi (input qty, tombol submit, modal edit)
* Validasi request & response API (via console log dan alert feedback)

---

## 🧾 Catatan

* Semua komunikasi antar komponen menggunakan state lokal React.
* Token JWT disimpan di parent state dan diteruskan via props.
* UI responsif berkat penggunaan Tailwind CSS.
* SPA (Single Page App): Routing dilakukan di sisi frontend, dengan fallback dari Nginx (`try_files $uri /index.html`).
