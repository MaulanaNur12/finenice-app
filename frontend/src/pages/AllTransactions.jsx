import { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";

export default function AllTransactions({ token }) {
  const [trx, setTrx] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      setError("Token tidak tersedia, silakan login.");
      return;
    }

    fetch(`${BASE_URL}/transactions/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data semua transaksi");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTrx(data);
          setError("");
        } else {
          setError("Data transaksi tidak valid.");
          setTrx([]);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError("Terjadi kesalahan saat mengambil data transaksi.");
        setTrx([]);
      });
  }, [token, BASE_URL]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Transactions (Admin)</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!error && trx.length === 0 && (
        <p className="text-gray-400">Belum ada transaksi tercatat.</p>
      )}

      {!error && trx.length > 0 && <TransactionsTable data={trx} />}
    </div>
  );
}
