# 🐳 docker.md

## 🚀 Menjalankan Frontend dengan Docker

Dokumentasi ini menjelaskan cara build dan menjalankan aplikasi frontend **Finenice App** menggunakan Docker.

---

## 🧱 Build Docker Image

Pastikan Anda berada di direktori `frontend/`, lalu jalankan:

```bash
docker build -t finenice-frontend .
```

Perintah ini akan:

* Menggunakan image `node:18-alpine` untuk build project
* Menyalin hasil build ke image `nginx:alpine`
* Menggunakan konfigurasi `default.conf` agar routing SPA React tetap bekerja

---

## ▶️ Jalankan Container

```bash
docker run -d -p 3000:80 finenice-frontend
```

Frontend akan bisa diakses melalui:

```
http://localhost:3000/
```

---

## 🧾 Contoh `Dockerfile`

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
```

---

## ⚙️ Contoh `default.conf`

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }
}
```

Konfigurasi ini memungkinkan aplikasi React tetap menampilkan halaman yang benar meskipun user melakukan refresh di URL tertentu (SPA fallback).

---

## 🧪 Validasi

* Akses `http://localhost:3000` dari browser
* Pastikan halaman muncul tanpa error
* Jika kosong, periksa konfigurasi `nginx`, `.env`, dan port backend
