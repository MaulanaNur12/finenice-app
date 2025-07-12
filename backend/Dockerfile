# Gunakan Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Salin dependencies dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file app ke dalam container
COPY . .

# Jalankan aplikasi
CMD ["python", "app.py"]
