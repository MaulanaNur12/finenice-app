# 🛠️ dashboard.md

## 📂 Komponen `Dashboard.js`

Komponen ini digunakan untuk mengelola data produk (CRUD) dan hanya bisa diakses oleh **admin**.

---

## 🛠️ Fitur Utama

* Menampilkan daftar produk dari backend
* Menambahkan produk baru
* Mengedit data produk
* Menghapus produk

---

## 📡 Endpoint yang Digunakan

```http
GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id
```

Semua request menggunakan header:

```http
Authorization: Bearer <token>
```

---

## ⚙️ Alur Kerja

1. Saat dimount → `fetchProducts()` mengambil data produk
2. Jika `isAdmin`, tampilkan form tambah produk
3. Produk ditampilkan dalam list/grid
4. Admin bisa klik **Edit** untuk membuka modal form update
5. Admin bisa klik **Hapus** untuk menghapus produk
6. Perubahan dikirim ke backend dengan autentikasi

---

## 📋 Validasi

* Nama produk harus diisi
* Harga > 0 (angka)
* Stok >= 0 (angka bulat)

---

## 🧪 Struktur State

```js
products: [],
form: {
  name: "",
  price: 0,
  stock: 0
},
updateData: null,
updateModalOpen: false,
loading: false,
error: ""
```

---

## 🖼️ Tampilan UI

* Daftar produk ditampilkan dalam bentuk kartu atau tabel
* Form tambah produk di bagian atas atau samping
* Modal untuk edit produk muncul saat tombol edit ditekan
* Loading spinner saat request berjalan

---

## 🔐 Autentikasi & Role

* Komponen ini tidak akan menampilkan form/tombol edit jika `isAdmin` = false
* Token JWT wajib dikirim dalam setiap request

---

## 📍 Catatan Tambahan

* Setelah aksi berhasil (tambah/edit/hapus), jalankan `fetchProducts()` ulang
* Jika terjadi error pada request, tampilkan alert atau notifikasi
* Gunakan format uang lokal untuk harga produk (`Intl.NumberFormat`)
