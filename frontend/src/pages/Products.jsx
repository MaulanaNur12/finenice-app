import { useEffect, useState } from "react";

export default function Products({ token, isAdmin }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Untuk modal update
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ id: null, name: "", price: "", stock: "" });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) throw new Error("Gagal fetch produk");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    // Validasi sederhana
    if (!form.name.trim()) return alert("Nama produk wajib diisi");
    if (!form.price || isNaN(form.price) || form.price <= 0) return alert("Harga harus angka > 0");
    if (!form.stock || isNaN(form.stock) || form.stock < 0) return alert("Stok harus angka >= 0");

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price: parseInt(form.price, 10),
          stock: parseInt(form.stock, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Gagal tambah produk");
      alert(data.msg || "Produk berhasil ditambahkan");
      setForm({ name: "", price: "", stock: "" });
      fetchProducts();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Gagal menghapus produk");
      alert(data.msg || "Produk berhasil dihapus");
      fetchProducts();
    } catch (e) {
      alert(e.message);
    }
  };

  const openUpdateModal = (p) => {
    setUpdateData({
      id: p.id,
      name: p.name,
      price: p.price.toString(),
      stock: p.stock.toString(),
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    // Validasi sederhana
    if (!updateData.name.trim()) return alert("Nama produk wajib diisi");
    if (!updateData.price || isNaN(updateData.price) || updateData.price <= 0) return alert("Harga harus angka > 0");
    if (!updateData.stock || isNaN(updateData.stock) || updateData.stock < 0) return alert("Stok harus angka >= 0");

    try {
      const res = await fetch(`http://localhost:5000/products/${updateData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updateData.name.trim(),
          price: parseInt(updateData.price, 10),
          stock: parseInt(updateData.stock, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Gagal update produk");
      alert(data.msg || "Produk berhasil diperbarui");
      setUpdateModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="p-4 space-y-6 text-white">
      {error && (
        <div className="bg-red-600 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {loading && <div>Loading...</div>}

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
                <button
                  onClick={() => openUpdateModal(p)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Update */}
      {updateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold">Update Produk</h3>
            <input
              name="name"
              placeholder="Nama Produk"
              value={updateData.name}
              onChange={handleUpdateChange}
              className="w-full p-2 text-black rounded"
            />
            <input
              name="price"
              placeholder="Harga"
              type="number"
              value={updateData.price}
              onChange={handleUpdateChange}
              className="w-full p-2 text-black rounded"
            />
            <input
              name="stock"
              placeholder="Stok"
              type="number"
              value={updateData.stock}
              onChange={handleUpdateChange}
              className="w-full p-2 text-black rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setUpdateModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
