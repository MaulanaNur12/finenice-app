# 🔐 auth.md

## 🔑 Autentikasi - Komponen Login & Register

Aplikasi frontend Finenice App menyediakan dua komponen utama untuk proses autentikasi pengguna:

* `Login.js`: Form login pengguna
* `Register.js`: Form registrasi pengguna baru

---

## 🧾 Komponen `Login.js`

### 📋 Deskripsi

Form login untuk autentikasi pengguna. Mengirimkan username dan password ke backend Flask dan menerima token JWT jika sukses.

### ⚙️ Alur Kerja

1. User mengisi input `username` dan `password`
2. Setelah form disubmit:

   * Validasi form (tidak boleh kosong)
   * Kirim request ke endpoint `/auth/login`:

```http
POST /auth/login
Content-Type: application/json
{
  "username": "admin",
  "password": "admin123"
}
```

3. Jika berhasil:

   * Simpan `access_token` ke state via props `setToken`
   * Redirect atau akses ke halaman lain
4. Jika gagal:

   * Tampilkan pesan error

### 📦 Dependencies

* React `useState`
* Props: `setToken`

### 💡 UX

* Disable tombol saat loading
* Tampilkan pesan error di bawah form
* Dibangun dengan Tailwind CSS

---

## 📝 Komponen `Register.js`

### 📋 Deskripsi

Form registrasi pengguna baru. Memungkinkan user memilih role `user` atau `admin`.

### ⚙️ Alur Kerja

1. User mengisi form (username, password, role)
2. Submit form → validasi input
3. Kirim request ke backend:

```http
POST /auth/register
Content-Type: application/json
{
  "username": "johndoe",
  "password": "123456",
  "role": "user"
}
```

4. Jika sukses → tampilkan alert & reset form
5. Jika gagal → tampilkan pesan error

### 📦 Struktur State

```js
{
  username: "",
  password: "",
  role: "user"
}
```

### ✅ Validasi

* Username dan password tidak boleh kosong
* Role default adalah `user`

---

## 🚫 Keamanan

* Jangan tampilkan token di console/log
* Semua request dikirim menggunakan header:

```http
Authorization: Bearer <token>
```

---

## 🔄 Alur Otentikasi Umum

1. User login → menerima token
2. Token dikirimkan ke komponen lain via props
3. Komponen yang butuh akses protected (ex: dashboard, transaksi) akan menggunakan token ini di `Authorization header`

---

Login dan register merupakan pintu masuk ke seluruh sistem. Pastikan alurnya aman dan user-friendly.
