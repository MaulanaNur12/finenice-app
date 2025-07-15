# 🛠️ build.md

## 📦 Build untuk Produksi

Frontend Finenice App dibangun menggunakan React (dengan Vite) dan dapat di-*build* untuk kebutuhan deployment produksi.

---

## ⚙️ Perintah Build

```bash
npm run build
```

Perintah ini akan menghasilkan output build statis (HTML, CSS, JS) yang siap dideploy.

---

## 📁 Output Build

Hasil build biasanya berada di folder:

```
dist/
```

atau jika menggunakan create-react-app:

```
build/
```

Pastikan folder ini sudah ditambahkan ke `.gitignore`.

---

## 🚀 Jalankan Hasil Build Secara Lokal (Opsional)

Jika ingin menguji hasil build secara lokal:

```bash
npm install -g serve
serve -s dist
```

Aplikasi akan tersedia di `http://localhost:3000` (default).

---

## 📝 Catatan Tambahan

* Jangan lupa mengatur variabel lingkungan (`.env`) sebelum melakukan build
* Hasil build ini digunakan juga oleh Dockerfile
* File SPA harus menangani routing fallback (lihat konfigurasi Nginx)

---

## 📄 Referensi Terkait

* [`Dockerfile`](./docker.md)
* [`default.conf` untuk Nginx SPA routing](./docker.md#defaultconf)
