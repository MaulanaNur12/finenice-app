# ☸️ kubernetes.md

## 🚢 Deployment Frontend ke Kubernetes

Panduan ini menjelaskan bagaimana cara mendeploy aplikasi frontend **Finenice App** ke dalam klaster Kubernetes.

---

## 📄 File Deployment

Pastikan Anda memiliki file `frontend-deployment.yaml` dengan isi seperti berikut:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: finenice-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: finenice-frontend
  template:
    metadata:
      labels:
        app: finenice-frontend
    spec:
      containers:
        - name: frontend
          image: finenice-frontend:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: finenice-frontend-service
spec:
  type: NodePort
  selector:
    app: finenice-frontend
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30081

```

---

## 🚀 Apply Deployment

```bash
kubectl apply -f frontend-deployment.yaml
```

Perintah ini akan:

* Membuat deployment frontend
* Membuat service dengan NodePort agar bisa diakses dari luar klaster

---

## 🌐 Akses Aplikasi

Jika menggunakan Minikube:

```bash
minikube service frontend-service
```

Atau akses melalui `localhost:30081` jika port sudah di-forward ke host.

---

## 🧪 Validasi

* Jalankan `kubectl get pods` dan pastikan pod frontend berstatus `Running`
* Akses aplikasi dari browser dan pastikan UI tampil dengan benar
* Jika kosong, cek log pod: `kubectl logs <nama-pod>`

---

## 📝 Catatan

* Pastikan image `finenice-frontend` sudah tersedia di registry/container runtime
* Jika menggunakan Minikube dan image lokal, jalankan build di dalam Minikube:

```bash
eval $(minikube docker-env)
docker build -t finenice-frontend .
```

Atau gunakan image yang telah dipush ke registry publik (Docker Hub, GitHub Packages, dll.)
