import { useEffect, useState } from "react";

export default function Dashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const validateForm = () => {
    if (!form.name.trim()) {
      alert("Nama produk harus diisi");
      return false;
    }
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert("Harga harus angka positif");
      return false;
    }
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      alert("Stok harus angka bulat >= 0");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateForm()) return;
    setLoading(true);

    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    })
      .then(res => res.json())
      .then(() => {
        setForm({ name: "", price: "", stock: "" });
        fetchProducts();
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    setLoading(true);

    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchProducts())
      .finally(() => setLoading(false));
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    setLoading(true);

    fetch(`http://localhost:5000/products/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    })
      .then(() => {
        setForm({ name: "", price: "", stock: "" });
        setEditId(null);
        fetchProducts();
      })
      .finally(() => setLoading(false));
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Dashboard Admin</h2>

      <div className="space-y-2 mb-6 max-w-md">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded text-black w-full"
          disabled={loading}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 rounded text-black w-full"
          disabled={loading}
        />
        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="p-2 rounded text-black w-full"
          disabled={loading}
        />
        {editId ? (
          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-yellow-600 p-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-600 p-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-600 p-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Tambah"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded shadow">
            <p className="font-bold">{p.name}</p>
            <p>Harga: Rp{p.price}</p>
            <p>Stok: {p.stock}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 px-2 py-1 rounded"
                disabled={loading}
              >
                Hapus
              </button>
              <button
                onClick={() => startEdit(p)}
                className="bg-yellow-600 px-2 py-1 rounded"
                disabled={loading}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
