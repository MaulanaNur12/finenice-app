import os
import mysql.connector

db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),      # default fallback
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "password"),
    database=os.getenv("DB_NAME", "finenice")
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
