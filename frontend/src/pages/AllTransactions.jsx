import { useEffect, useState } from "react";

export default function AllTransactions({ token }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) return; // 🛡️ Cegah fetch tanpa token

    fetch("http://localhost:5000/transactions/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ALL TRANSACTIONS:", data); // DEBUG
        setTransactions(data);
      });
  }, [token]); // ✅ Tambahkan token sebagai dependency

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
                {t.items.map((item, idx) => (
                  <li key={idx}>
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
