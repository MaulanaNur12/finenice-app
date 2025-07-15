# ▶️ Cara Menjalankan Backend - Finenice App

Backend Finenice App dapat dijalankan dalam tiga cara utama:

1. **Lokal (tanpa container)**
2. **Menggunakan Docker**
3. **Menggunakan Kubernetes**

---

## 💻 1. Menjalankan Secara Lokal

Cocok untuk keperluan development atau testing ringan.

### ✅ Prasyarat

- Python 3.11+
- MySQL (running di lokal atau remote)
- File `.env` (opsional) berisi konfigurasi database

### 🔧 Perintah

pip install -r requirements.txt
python app.py

🌐 Akses
Aplikasi akan berjalan di:

http://localhost:5000
🐳 2. Menjalankan Menggunakan Docker
Cocok untuk environment yang konsisten di berbagai sistem.

🔨 Build Image

docker build -t finenice-backend .
🚀 Jalankan Container

docker run -p 5000:5000 finenice-backend
Jika menggunakan .env:

docker run --env-file .env -p 5000:5000 finenice-backend
☸️ 3. Menjalankan dengan Kubernetes
Cocok untuk deployment skala produksi dan cloud-native.

🗂 File yang Dibutuhkan
finenice-backend.yaml

Image sudah tersedia secara lokal atau di registry

🚀 Jalankan

kubectl apply -f finenice-backend.yaml
🌐 Akses API
Jika service NodePort diset ke 30080:

http://<node-ip>:30080
Ganti <node-ip> dengan IP dari node Minikube atau cluster kamu.

🔍 Cek Status

kubectl get pods
kubectl get services
💡 Tips Tambahan
Gunakan .env file atau Kubernetes Secrets untuk menjaga credential.

Jalankan database MySQL secara terpisah jika belum tersedia.

Pastikan port tidak bentrok (misalnya 5000 atau 30080).

