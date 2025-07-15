# 🧾 transactions.md

## 🔍 Komponen `Transactions.js`

Komponen ini menampilkan daftar **transaksi milik pengguna yang sedang login**.

---

## 🛠️ Fitur Utama

* Menampilkan riwayat transaksi user
* Fetch data dari endpoint `/transactions`
* Tampilkan data berupa ID, total, tanggal, dan detail item
* Menangani error jika token tidak valid atau request gagal

---

## ⚙️ Alur Kerja

1. Komponen dimount → periksa ketersediaan `token`
2. Jika tersedia, kirim request `GET /transactions`
3. Jika sukses → simpan ke `trx`
4. Jika gagal → tampilkan `error`

---

## 🔐 Autentikasi

* Komponen membutuhkan `token` sebagai prop
* Jika `token` tidak tersedia, fetch tidak dilakukan dan akan muncul pesan error

---

## 📦 Struktur State

```js
trx: [],       // Menyimpan daftar transaksi user
error: ""      // Menyimpan pesan error jika ada
```

---

## 📡 Endpoint

```http
GET /transactions
Authorization: Bearer <token>
```

---

## 📝 Format Data Respon

```json
[
  {
    "id": 1,
    "total": 150000,
    "created_at": "2024-07-01T10:00:00Z",
    "items": [
      {
        "product_name": "Produk A",
        "quantity": 2,
        "price": 75000
      }
    ]
  },
  ...
]
```

---

## 🖼️ Contoh Tampilan

```
My Transactions
-------------------------
#1 - Total: Rp150.000
Tanggal: 01/07/2024 17:00
- Produk A (2x) - Rp75.000
```

---

## 🧪 Debugging (Console Log)

* Log token yang digunakan
* Status fetch dan isi respon
* Error message jika fetch gagal

---

## 📍 Catatan

* Wajib mengecek token sebelum fetch
* Gunakan format tanggal lokal (misal `toLocaleString()`)
* Cocok digunakan pada dashboard user
