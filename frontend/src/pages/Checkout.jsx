import { useEffect, useState } from "react";

export default function Checkout({ token }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5000/products")
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil produk");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        const initialQty = {};
        data.forEach(p => (initialQty[p.id] = 0));
        setQuantities(initialQty);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQtyChange = (id, qty) => {
    let value = parseInt(qty, 10);
    if (isNaN(value) || value < 0) value = 0;

    const product = products.find(p => p.id === id);
    if (value > product.stock) {
      alert(`Qty untuk ${product.name} melebihi stok!`);
      return;
    }

    setQuantities({ ...quantities, [id]: value });
  };

  const handleCheckout = async () => {
    const items = products
      .filter(p => quantities[p.id] > 0)
      .map(p => ({
        id: p.id,
        qty: quantities[p.id],
        price: p.price,
      }));

    if (items.length === 0) {
      alert("Pilih setidaknya 1 produk sebelum checkout.");
      return;
    }

    setCheckoutLoading(true);

    try {
      const res = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || "Checkout gagal");
      }

      const data = await res.json();
      alert(data.msg);

      // Refresh produk & reset quantity setelah checkout
      fetchProducts();
    } catch (err) {
      alert(err.message || "Gagal melakukan checkout.");
      console.error(err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const total = products.reduce(
    (sum, p) => sum + (quantities[p.id] || 0) * p.price,
    0
  );

  if (loading) return <p className="text-white p-6">Loading produk...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded shadow-md">
            <p className="text-lg font-semibold">{p.name}</p>
            <p className="text-sm">Harga: Rp{p.price.toLocaleString()}</p>
            <p className="text-sm">Stok: {p.stock}</p>
            <label htmlFor={`qty-${p.id}`} className="sr-only">
              Quantity {p.name}
            </label>
            <input
              id={`qty-${p.id}`}
              type="number"
              min="0"
              max={p.stock}
              value={quantities[p.id] || 0}
              onChange={(e) => handleQtyChange(p.id, e.target.value)}
              className="mt-2 w-20 p-1 text-center rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={checkoutLoading}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-semibold text-lg">
        Total: Rp{total.toLocaleString()}
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 transition duration-200 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={total === 0 || checkoutLoading}
      >
        {checkoutLoading ? "Memproses..." : "Submit Order"}
      </button>
    </div>
  );
}
