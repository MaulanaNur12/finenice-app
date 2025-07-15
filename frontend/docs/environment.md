# 🌿 environment.md

## 🔧 Konfigurasi Environment (`.env`)

Aplikasi frontend Finenice App menggunakan file `.env` untuk menyimpan variabel environment yang dibutuhkan saat runtime dan build.

---

## 🗂️ Lokasi

File `.env` diletakkan di dalam direktori `frontend/`, sejajar dengan `package.json`.

```bash
/frontend
├── .env
├── package.json
└── ...
```

---

## 🛠️ Variabel yang Digunakan

### `CREATE_API_BASE`

URL dasar untuk backend Flask API.

Contoh:

```env
CREATE_API_BASE=http://localhost:5000
```

Nilai ini digunakan di dalam fetch atau axios seperti:

```js
fetch(`${import.meta.env.CREATE_API_BASE}/products`)
```

---

## 🔁 Perubahan `.env`

Jika Anda mengubah file `.env`, pastikan untuk menghentikan dan menjalankan ulang server lokal:

```bash
npm run dev
```

Hal ini karena CRA membaca `.env` hanya saat proses start.

---

## 🧪 Validasi

* Pastikan `CREATE_API_BASE` sesuai dengan alamat backend
* Periksa di browser console jika terjadi `CORS` error atau `fetch` gagal

---

## ⚠️ Tips Keamanan

* Jangan commit file `.env` ke dalam Git
* Tambahkan `.env` ke `.gitignore`:

```gitignore
.env
```

* Untuk deployment production, bisa gunakan `.env.production` atau konfigurasi environment variabel di hosting container Anda
