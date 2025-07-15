# Gunakan image untuk build React
FROM node:18 as build
WORKDIR /app

# Salin package.json dan .env terlebih dahulu agar layer caching efisien
COPY package*.json ./
COPY .env .env

# Install dependencies
RUN npm install

# Salin seluruh source code lainnya
COPY . .

# Build react dengan .env sudah ada
RUN npm run build

# Gunakan image nginx untuk serve hasil build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
