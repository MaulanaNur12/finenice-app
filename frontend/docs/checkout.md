# 💳 checkout.md

## 🧩 Komponen `Checkout.js`

Komponen ini memungkinkan pengguna melakukan pembelian produk yang tersedia. Hanya pengguna login (dengan token JWT) yang bisa melakukan checkout.

---

## 🔧 Endpoint yang Digunakan

* GET `/products` → Mendapatkan daftar produk
* POST `/checkout` → Mengirim transaksi checkout

Setiap request menggunakan header:

```http
Authorization: Bearer <token>
```

---

## 🛠️ Fitur

* Menampilkan daftar produk
* Input jumlah kuantitas untuk tiap produk
* Validasi terhadap stok
* Hitung total harga otomatis
* Submit transaksi ke backend

---

## ⚙️ Alur Kerja

1. Komponen mount → `fetchProducts()` dijalankan
2. Produk disimpan ke state `products`
3. User input qty → update `quantities`
4. Submit → ambil item yang qty > 0
5. Kirim ke backend via POST `/checkout`

---

## 📋 Validasi

* Minimal 1 produk harus dipilih (qty > 0)
* Qty tidak boleh melebihi stok
* Qty harus angka positif atau 0

---

## 🧪 Contoh Payload Checkout

```json
{
  "items": [
    { "id": 1, "qty": 2, "price": 10000 },
    { "id": 3, "qty": 1, "price": 15000 }
  ]
}
```

---

## 💾 Struktur State

```js
products: [],
quantities: {},
loading: false,
checkoutLoading: false,
error: ""
```

---

## 🎨 Tampilan

* Produk ditampilkan dalam grid responsif
* Field input untuk qty
* Tombol Submit aktif jika total > 0
* Loading indicator saat proses checkout

---

## 🧠 Catatan

* Setelah checkout berhasil, refresh data produk agar stok terupdate
* Gunakan alert atau notifikasi jika proses berhasil/gagal
* Perhatikan validasi stok dan total harga

---

## 📦 Dependensi

* `useState`, `useEffect` dari React
* Environment: `REACT_APP_API_URL`
* Props: `token` untuk autentikasi
