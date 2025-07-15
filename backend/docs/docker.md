# 🐳 Docker - Backend Finenice App

Docker digunakan untuk mengemas aplikasi backend agar dapat dijalankan secara konsisten di berbagai lingkungan, termasuk development lokal maupun production.

---

## 📦 Dockerfile

Berikut adalah isi `Dockerfile` yang digunakan:

```Dockerfile
FROM python:3.11-slim

# Set direktori kerja dalam container
WORKDIR /app

# Salin file requirements.txt dan install dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh file backend ke dalam container
COPY . .

# Jalankan aplikasi Flask
CMD ["python", "app.py"]

🛠️ Build Image
Untuk membangun image Docker dari Dockerfile di direktori ini, jalankan perintah berikut:

docker build -t finenice-backend .
-t digunakan untuk memberikan nama pada image, dalam hal ini finenice-backend.

🚀 Menjalankan Container
Setelah image berhasil dibuat, kamu bisa menjalankan container dengan:

docker run -p 5000:5000 finenice-backend
Penjelasan:

-p 5000:5000 artinya port 5000 di container akan tersedia di port 5000 di host

Flask akan berjalan di http://localhost:5000

⚙️ Environment Variable
Jika kamu menggunakan .env, kamu bisa menggunakannya saat docker run:

docker run --env-file .env -p 5000:5000 finenice-backend
📁 Struktur File Minimal untuk Docker
.
├── app.py
├── models.py
├── requirements.txt
├── Dockerfile
└── .env (opsional)
💡 Tips Tambahan
Gunakan .dockerignore untuk menghindari file yang tidak perlu masuk ke image.

Jika ingin menggunakan volume untuk persistensi, tambahkan -v saat menjalankan container.