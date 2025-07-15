# 📦 Finenice Backend API

Backend untuk aplikasi Finenice — sistem manajemen produk dan transaksi menggunakan Flask, JWT, dan MySQL.

---

## 🚀 Cara Menjalankan

```bash
# Clone repo
git clone https://github.com/MaulanaNur12/finenice-app.git
cd finenice-app/backend

# Install dependencies
pip install -r requirements.txt

# Jalankan server
python app.py

backend/
├── app.py                # Main Flask App
├── models.py             # Koneksi ke database & inisialisasi
├── requirements.txt      # Daftar dependensi Python
├── Dockerfile            # instruksi untuk membuat image Docker
├── finenice-backend.yaml # digunakan untuk mendefinisikan Deployment dan Service di Kubernetes agar backend
└── README.md             # Dokumentasi backend ini

1. app.py 
a Import Flask 
# Dokumentasi Backend

Berikut adalah gambar ilustrasi Flask:

![Flask](https://github.com/MaulanaNur12/finenice-app/blob/main/backend/assets/Flask.png?raw=true)


Kode Flask tersebut membuat aplikasi web sederhana. Pertama, program mengimpor Flask dan membuat objek aplikasi. Lalu, menggunakan `@app.route('/')` untuk menetapkan URL root (`/`) yang ketika diakses akan memunculkan teks “Hello from Flask!”. Di bagian akhir, `app.run(host='0.0.0.0', port=5000)` digunakan untuk menjalankan server pada port 5000 dan menerima koneksi dari semua alamat IP, yang berguna jika dijalankan dari lingkungan seperti WSL atau Docker. Kode ini cocok sebagai dasar untuk membangun aplikasi web atau REST API.


