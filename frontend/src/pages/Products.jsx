import { useEffect, useState } from "react";

export default function Products({ token, isAdmin }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    const { name, price, stock } = form;
    const body = {
      name: name.trim(),
      price: parseInt(price, 10),
      stock: parseInt(stock, 10),
    };

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.msg);
    setForm({ name: "", price: "", stock: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(data.msg);
    fetchProducts();
  };

  const handleUpdate = async (id) => {
    const updated = prompt("Masukkan nama, harga, stok (pisahkan koma)\nContoh: Kopi Hitam,15000,20");
    if (!updated) return;
    const [name, price, stock] = updated.split(",");
    const body = {
      name: name.trim(),
      price: parseInt(price, 10),
      stock: parseInt(stock, 10),
    };

    const res = await fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.msg);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <h2 className="text-xl font-bold mb-2">Tambah Produk</h2>
          <input
            placeholder="Nama Produk"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 text-black rounded"
          />
          <input
            placeholder="Harga"
            value={form.price}
            type="number"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-2 text-black rounded"
          />
          <input
            placeholder="Stok"
            value={form.stock}
            type="number"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full p-2 text-black rounded"
          />
          <button onClick={handleAdd} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Tambah
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded">
            <p className="text-lg font-bold">{p.name}</p>
            <p>Harga: Rp{p.price.toLocaleString()}</p>
            <p>Stok: {p.stock}</p>
            {isAdmin && (
              <div className="mt-2 space-x-2">
                <button onClick={() => handleUpdate(p.id)} className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700">Hapus</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
