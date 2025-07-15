# 🛒 products.md

## 🧩 Komponen `Products.js`

Komponen ini menampilkan daftar produk dan memungkinkan admin untuk melakukan operasi CRUD (Create, Read, Update, Delete).

---

## 👥 Role Akses

* **User:** hanya bisa melihat produk
* **Admin:** bisa melihat, menambah, mengedit, dan menghapus produk

---

## 🔧 Endpoint yang Digunakan

| Method | Endpoint        | Deskripsi                 |
| ------ | --------------- | ------------------------- |
| GET    | `/products`     | Mendapatkan semua produk  |
| POST   | `/products`     | Menambah produk baru      |
| PUT    | `/products/:id` | Mengubah data produk      |
| DELETE | `/products/:id` | Menghapus produk tertentu |

Semua request (kecuali GET) harus menyertakan header:

```http
Authorization: Bearer <token>
```

---

## 🛠️ Fitur Utama

### Untuk Semua Pengguna

* Menampilkan produk dalam daftar/grid
* Informasi: nama, harga, stok

### Untuk Admin

* Form tambah produk baru
* Tombol edit dan hapus untuk setiap produk
* Modal untuk update data produk

---

## ⚙️ Alur Kerja

1. Saat komponen dimuat:

   * `fetchProducts()` dijalankan
2. Data disimpan di state `products`
3. Jika role admin:

   * Form tambah produk akan muncul
   * Tombol `Edit` dan `Hapus` tersedia
4. Submit form akan mengirim request POST/PUT ke backend

---

## 📋 Validasi

* Nama produk tidak boleh kosong
* Harga harus berupa angka positif
* Stok harus angka bulat >= 0

---

## 💾 Struktur State

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

## 🧪 Contoh Data Produk

```json
[
  {
    "id": 1,
    "name": "Kopi Hitam",
    "price": 12000,
    "stock": 15
  },
  {
    "id": 2,
    "name": "Teh Manis",
    "price": 8000,
    "stock": 30
  }
]
```

---

## 🎨 Tampilan

* Dibangun dengan Tailwind CSS
* Tampilkan produk dalam grid responsif
* Modal edit menggunakan state `updateModalOpen`

---

## 🧠 Catatan

* Pastikan token dikirim di header saat operasi data
* Tangani error dari server agar tidak crash
* Form akan reset setelah sukses tambah/edit
