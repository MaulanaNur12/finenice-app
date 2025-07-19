export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">User Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Your Orders</h3>
          <p className="text-gray-400 text-sm">You have 3 active orders in process.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Checkout Progress</h3>
          <p className="text-gray-400 text-sm">Last checkout was 2 days ago.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium mb-2">Transaction History</h3>
          <p className="text-gray-400 text-sm">View your latest transaction activities.</p>
        </div>
      </div>
    </div>
  );
}
