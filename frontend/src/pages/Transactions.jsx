import { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";

export default function Transactions({ token }) {
  const [trx, setTrx] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      setError("Token tidak tersedia, silakan login.");
      return;
    }

    fetch(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data transaksi");
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
      <h2 className="text-2xl font-semibold mb-4">My Transactions</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!error && trx.length === 0 && (
        <p className="text-gray-400">Belum ada transaksi.</p>
      )}

      {!error && trx.length > 0 && <TransactionsTable data={trx} />}
    </div>
  );
}
