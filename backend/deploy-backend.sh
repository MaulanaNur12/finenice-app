#!/bin/bash

# ====== Konfigurasi ======
APP_NAME="finenice-backend"
TAG="v$(date +%s)"  # auto timestamp tag
IMAGE_NAME="${APP_NAME}:${TAG}"

echo "🚀 Membuild image ${IMAGE_NAME}..."
docker build -t ${IMAGE_NAME} .

echo "📦 Memuat image ke dalam Minikube..."
minikube image load ${IMAGE_NAME}

echo "🔁 Mengupdate deployment image di Kubernetes..."
kubectl set image deployment/${APP_NAME} backend=${IMAGE_NAME}

echo "✅ Done! Image baru sudah dipakai oleh deployment:"
kubectl rollout status deployment/${APP_NAME}
