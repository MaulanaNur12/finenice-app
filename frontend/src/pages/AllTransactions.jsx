import { useEffect, useState } from "react";

export default function AllTransactions({ token }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}/transactions/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        setError(err.message || "Gagal mengambil data transaksi");
      })
      .finally(() => setLoading(false));
  }, [token, BASE_URL]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Semua Transaksi</h2>
      {transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <div className="space-y-6">
          {transactions.map((t) => (
            <div key={t.id} className="bg-gray-800 p-4 rounded">
              <p className="font-semibold">ID Transaksi: {t.id}</p>
              <p>User ID: {t.user_id}</p>
              <p>Total: Rp{t.total.toLocaleString()}</p>
              <p>Tanggal: {new Date(t.created_at).toLocaleString()}</p>
              <ul className="list-disc list-inside mt-2">
                {(t.items ?? []).map((item) => (
                  <li key={item.id ?? item.product_name}>
                    {item.product_name} - Qty: {item.quantity} - Rp{item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
