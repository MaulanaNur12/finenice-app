import { useEffect, useState } from "react";

export default function Transactions({ token }) {
  const [trx, setTrx] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token tidak tersedia, silakan login.");
      return;
    }

    console.log("TOKEN SAAT FETCH TRANSAKSI:", token); // Debug token

    fetch("http://localhost:5000/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("RESPON STATUS:", res.status); // Debug status
        if (!res.ok) {
          throw new Error("Gagal mengambil data transaksi");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA TRANSAKSI:", data);
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
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">My Transactions</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!error && trx.length === 0 && <p>Belum ada transaksi.</p>}
      <ul className="space-y-2">
        {trx.map((t) => (
          <li
            key={t.id}
            className="border p-2 rounded shadow-sm bg-white text-black"
          >
            <strong>#{t.id}</strong> - Total: Rp{t.total.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
