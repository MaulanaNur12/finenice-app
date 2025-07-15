# ☸️ Kubernetes Deployment - Finenice App Backend

Backend Finenice App dapat dideploy ke dalam cluster Kubernetes menggunakan file manifest `finenice-backend.yaml`. File ini mencakup konfigurasi **Deployment** dan **Service** agar backend dapat berjalan dan diakses dari luar cluster.

---

## 📄 Struktur `finenice-backend.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: finenice-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: finenice-backend
  template:
    metadata:
      labels:
        app: finenice-backend
    spec:
      containers:
        - name: backend
          image: finenice-backend:latest
          ports:
            - containerPort: 5000
          env:
            - name: DB_HOST
              value: "mysql-service"
            - name: DB_USER
              value: "root"
            - name: DB_PASSWORD
              value: "password"
            - name: DB_NAME
              value: "finenice"
            - name: JWT_SECRET_KEY
              value: "finenice-secret"
---
apiVersion: v1
kind: Service
metadata:
  name: finenice-backend-service
spec:
  type: NodePort
  selector:
    app: finenice-backend
  ports:
    - port: 5000
      targetPort: 5000
      nodePort: 30080

📦 Deployment
Menggunakan 1 replika untuk container backend

Image harus sudah dibuild dan tersedia secara lokal atau di registry (misal Docker Hub)

Environment variable dikonfigurasi langsung di dalam pod (env:)

🌐 Service
type: NodePort digunakan untuk mengekspos backend ke luar cluster

Port 30080 pada node akan mengarah ke 5000 di dalam container Flask

🚀 Jalankan Deployment
Untuk menjalankan backend di cluster Kubernetes:

kubectl apply -f finenice-backend.yaml
🔍 Verifikasi
Cek status pod:

kubectl get pods
Cek service:

kubectl get service finenice-backend-service
Akses backend via:


http://<node-ip>:30080
Ganti <node-ip> dengan IP node kamu, bisa lokal (Minikube) atau cloud (GKE, EKS, dst).

💡 Tips Tambahan
Gunakan ConfigMap atau Secrets untuk menyimpan environment variable secara terpisah.

Pastikan database MySQL juga dideploy di dalam cluster atau bisa diakses dari cluster.