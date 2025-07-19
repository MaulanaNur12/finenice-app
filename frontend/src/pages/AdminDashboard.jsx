export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Total Transactions</h3>
          <p className="text-gray-400 text-sm">125 transactions processed this month.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Active Users</h3>
          <p className="text-gray-400 text-sm">There are 85 active users today.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Product Listings</h3>
          <p className="text-gray-400 text-sm">You have 42 products available.</p>
        </div>
      </div>
    </div>
  );
}
