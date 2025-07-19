// src/components/TransactionsTable.jsx
import React from "react";

export default function TransactionsTable({ data }) {
  return (
    <div className="overflow-auto rounded-xl shadow-lg bg-gray-800">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                No transactions found.
              </td>
            </tr>
          ) : (
            data?.map((trx, index) => (
              <tr
                key={trx.id || index}
                className="border-b border-gray-700 hover:bg-gray-700/40 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{trx.username}</td>
                <td className="px-6 py-4">{trx.product_name}</td>
                <td className="px-6 py-4">Rp {trx.total?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trx.status === "completed"
                        ? "bg-green-600 text-white"
                        : trx.status === "pending"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {trx.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(trx.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
