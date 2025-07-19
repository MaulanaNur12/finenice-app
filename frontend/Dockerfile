# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Salin file yang diperlukan dulu agar caching efisien
COPY package*.json ./
COPY .env .env

# Install dependencies
RUN npm install

# Salin source code setelah npm install agar tidak men-trigger ulang install tiap kali ada perubahan kode
COPY . .

# Build React app
RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:alpine

# Hapus default config nginx agar tidak konflik
RUN rm /etc/nginx/conf.d/default.conf

# Salin hasil build ke direktori html
COPY --from=build /app/build /usr/share/nginx/html

# Salin konfigurasi nginx kustom
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
