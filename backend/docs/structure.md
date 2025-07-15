# 🗂️ Struktur File - Backend Finenice App

Struktur file pada backend Finenice App disusun secara sederhana namun terstruktur, agar mudah dipahami dan dikembangkan lebih lanjut.

---

## 📁 Struktur Direktori Utama

/
├── app.py
├── models.py
├── requirements.txt
├── Dockerfile
├── finenice-backend.yaml
└── .env (opsional)


---

## 📄 Penjelasan File

### `app.py`

File utama aplikasi Flask. Berisi:

- Konfigurasi Flask, JWT, dan CORS
- Definisi semua **endpoint API**
- Validasi dan logika bisnis untuk:
  - Autentikasi
  - Produk
  - Transaksi

---

### `models.py`

Berisi fungsi-fungsi terkait database:

- Membuka koneksi ke **MySQL**
- Membuat tabel (jika belum ada): `users`, `products`, `transactions`, `transaction_items`
- Fungsi query: insert, select, update, delete
- Menggunakan `mysql.connector` dan `DictCursor`

---

### `requirements.txt`

Daftar dependensi Python yang dibutuhkan untuk menjalankan backend:

Flask
Flask-JWT-Extended
Flask-CORS
mysql-connector-python
python-dotenv


---

### `Dockerfile`

Instruksi membangun image Docker backend ini:

- Menggunakan image `python:3.11-slim`
- Menyalin semua file backend
- Install dependencies
- Menjalankan `app.py` secara default

---

### `finenice-backend.yaml`

Konfigurasi **Kubernetes deployment** dan **service** untuk menjalankan backend di cluster K8s.

- Deployment untuk container image backend
- Service `NodePort` untuk expose ke luar cluster
- Environment variables diatur dari konfigurasi

---

### `.env` (opsional)

Berisi environment variabel seperti:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=finenice
JWT_SECRET_KEY=finenice-secret

🧭 Rekomendasi Struktur Folder Besar (Opsional)
Untuk proyek lebih kompleks, struktur ini bisa dipertimbangkan:

arduino
Salin
Edit
/
├── app/
│   ├── __init__.py
│   ├── routes/
│   ├── models/
│   └── utils/
├── tests/
├── config.py
├── requirements.txt
├── Dockerfile
└── run.py