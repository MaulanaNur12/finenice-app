from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity, get_jwt
)
from models import db, cursor, init_db

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['JWT_SECRET_KEY'] = 'finenice-secret'
jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user):
    return str(user["id"])

@jwt.additional_claims_loader
def add_claims_to_access_token(user):
    return {"role": user["role"]}

init_db()

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    # Tambahkan cursor.fetchall() agar tidak ada Unread result
    cursor.fetchall()
    cursor.execute(
        "INSERT INTO users (username, password, role) VALUES (%s, %s, %s)",
        (data['username'], data['password'], data.get('role', 'user'))
    )
    db.commit()
    return jsonify(msg='User registered')

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s",
                   (data['username'], data['password']))
    user = cursor.fetchone()
    if user:
        token = create_access_token(identity={"id": user['id'], "role": user['role']})
        return jsonify(access_token=token)
    return jsonify(msg='Login gagal'), 401

@app.route('/products', methods=['GET'])
def list_products():
    cursor.execute("SELECT * FROM products")
    return jsonify(cursor.fetchall())

@app.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    if get_jwt()["role"] != 'admin':
        return jsonify(msg='Unauthorized'), 403
    data = request.json
    price = int(str(data['price']).lstrip('0') or '0')  # Hapus 0 depan
    stock = int(str(data['stock']).lstrip('0') or '0')
    cursor.execute("INSERT INTO products (name, price, stock) VALUES (%s, %s, %s)",
                   (data['name'], price, stock))
    db.commit()
    return jsonify(msg='Produk ditambahkan')

@app.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    if get_jwt()["role"] != 'admin':
        return jsonify(msg='Unauthorized'), 403
    cursor.execute("DELETE FROM products WHERE id=%s", (id,))
    db.commit()
    return jsonify(msg='Produk dihapus')

@app.route('/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    if get_jwt()["role"] != 'admin':
        return jsonify(msg='Unauthorized'), 403
    data = request.json
    price = int(str(data['price']).lstrip('0') or '0')
    stock = int(str(data['stock']).lstrip('0') or '0')
    cursor.execute("UPDATE products SET name=%s, price=%s, stock=%s WHERE id=%s",
                   (data['name'], price, stock, id))
    db.commit()
    return jsonify(msg='Produk diupdate')

@app.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    user_id = int(get_jwt_identity())
    items = request.json['items']

    # Validasi stok
    for i in items:
        cursor.execute("SELECT stock FROM products WHERE id = %s", (i['id'],))
        product = cursor.fetchone()
        if not product:
            return jsonify(msg=f"Produk ID {i['id']} tidak ditemukan"), 404
        if product['stock'] < i['qty']:
            return jsonify(msg=f"Stok tidak cukup untuk produk ID {i['id']}"), 400

    # Simpan transaksi
    total = sum(i['qty'] * i['price'] for i in items)
    cursor.execute("INSERT INTO transactions (user_id, total) VALUES (%s, %s)", (user_id, total))
    trx_id = cursor.lastrowid

    # Simpan item dan kurangi stok
    for i in items:
        cursor.execute(
            "INSERT INTO transaction_items (transaction_id, product_id, quantity, price) VALUES (%s, %s, %s, %s)",
            (trx_id, i['id'], i['qty'], i['price'])
        )
        cursor.execute(
            "UPDATE products SET stock = stock - %s WHERE id = %s",
            (i['qty'], i['id'])
        )

    db.commit()
    return jsonify(msg='Transaksi berhasil')



@app.route('/transactions', methods=['GET'])
@jwt_required()
def get_user_transactions():
    user_id = int(get_jwt_identity())
    cursor.execute("SELECT * FROM transactions WHERE user_id = %s", (user_id,))
    return jsonify(cursor.fetchall())

@app.route('/transactions/all', methods=['GET'])
@jwt_required()
def get_all_transactions():
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify(msg="Unauthorized"), 403

    query = """
        SELECT 
            t.id AS transaction_id,
            t.user_id,
            t.total,
            t.created_at,
            ti.product_id,
            p.name AS product_name,
            ti.quantity,
            ti.price
        FROM transactions t
        JOIN transaction_items ti ON t.id = ti.transaction_id
        JOIN products p ON ti.product_id = p.id
        ORDER BY t.created_at DESC
    """
    cursor.execute(query)
    rows = cursor.fetchall()

    # Gabungkan item-item per transaksi
    transactions = {}
    for row in rows:
        trx_id = row["transaction_id"]
        if trx_id not in transactions:
            transactions[trx_id] = {
                "id": trx_id,
                "user_id": row["user_id"],
                "total": row["total"],
                "created_at": row["created_at"],
                "items": []
            }
        transactions[trx_id]["items"].append({
            "product_id": row["product_id"],
            "product_name": row["product_name"],
            "quantity": row["quantity"],
            "price": row["price"]
        })

    return jsonify(list(transactions.values()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
