# ⚙️ Teknologi dan Library - Backend Finenice App

Backend Finenice App dibangun menggunakan stack Python minimalis namun kuat untuk membangun REST API yang modular, aman, dan mudah dideploy.

---

## 🧱 Framework dan Tools

| Teknologi             | Fungsi                                                      |
|-----------------------|-------------------------------------------------------------|
| **Flask**             | Framework utama untuk membangun API REST                    |
| **Flask-JWT-Extended**| Autentikasi menggunakan JSON Web Token (JWT)                |
| **Flask-CORS**        | Mengizinkan frontend untuk melakukan request lintas domain  |
| **MySQL**             | Database utama untuk menyimpan user, produk, dan transaksi  |
| **mysql-connector-python** | Koneksi ke MySQL dari Python                          |
| **Docker**            | Membungkus aplikasi ke dalam container                      |
| **Kubernetes**        | Menjalankan aplikasi dalam cluster cloud-native             |

---

## 🔐 Flask-JWT-Extended

Digunakan untuk membuat dan memverifikasi token JWT yang digunakan sebagai mekanisme otorisasi.

```python
app.config['JWT_SECRET_KEY'] = 'finenice-secret'
jwt = JWTManager(app)

Fitur:
Token dikirim melalui Authorization: Bearer <token>

Bisa menyimpan user_id dan role dalam token

Digunakan di endpoint menggunakan @jwt_required()

🌐 Flask-CORS
Digunakan agar frontend (React) bisa mengakses backend yang berjalan di domain/port berbeda.

python

from flask_cors import CORS

CORS(app, origins=["*"], supports_credentials=True)

🗃️ MySQL
Digunakan untuk menyimpan data:

users: Menyimpan informasi pengguna dan peran

products: Menyimpan data produk

transactions: Header transaksi

transaction_items: Item per transaksi

Koneksi dilakukan dengan mysql.connector.connect() dan menggunakan cursor dictionary:

python

conn = mysql.connector.connect(**config)
cursor = conn.cursor(dictionary=True)
🐳 Docker
Backend dikemas sebagai image Docker melalui file Dockerfile, sehingga dapat dijalankan secara konsisten di berbagai environment.

Dockerfile

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]

☸️ Kubernetes
File finenice-backend.yaml mendeskripsikan cara menjalankan backend dalam cluster Kubernetes:

Deployment dengan image Docker

Service NodePort agar bisa diakses dari luar

Environment variable dikonfigurasi di env: dalam file yaml

📦 Dependensi (requirements.txt)

Flask
Flask-JWT-Extended
Flask-CORS
mysql-connector-python
python-dotenv