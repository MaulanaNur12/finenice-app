import { useEffect, useState } from "react";

export default function Dashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleAdd = () => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setForm({ name: "", price: "", stock: "" });
        fetchProducts();
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => fetchProducts());
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", price: "", stock: "" });
      fetchProducts();
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Dashboard Admin</h2>

      <div className="space-y-2 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded text-black"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
          className="p-2 rounded text-black"
        />
        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: +e.target.value })}
          className="p-2 rounded text-black"
        />
        <button onClick={handleAdd} className="bg-green-600 p-2 rounded ml-2">Tambah</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded shadow">
            <p className="font-bold">{p.name}</p>
            <p>Harga: Rp{p.price}</p>
            <p>Stok: {p.stock}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleDelete(p.id)} className="bg-red-600 px-2 py-1 rounded">Hapus</button>
              <button onClick={() => handleUpdate(p.id)} className="bg-yellow-600 px-2 py-1 rounded">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
