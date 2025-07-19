import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Akses Ditolak</h1>
      <p className="text-lg mb-6">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
