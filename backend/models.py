import mysql.connector

# ❌ HAPUS baris ini karena 'conn' belum didefinisikan:
# cursor = conn.cursor(dictionary=True)

# ✅ Gunakan koneksi ke database
db = mysql.connector.connect(
    host="localhost",       # ini nama service di Docker (jika pakai Docker)
    user="root",
    password="password",
    database="finenice"
)

# ✅ Cursor dictionary
cursor = db.cursor(dictionary=True)

def init_db():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100),
            password VARCHAR(100),
            role ENUM('admin', 'user') DEFAULT 'user'
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            price INT,
            stock INT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            total INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transaction_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            transaction_id INT,
            product_id INT,
            quantity INT,
            price INT
        )
    """)
    db.commit()
