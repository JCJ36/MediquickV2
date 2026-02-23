export default function AdminPage() {

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-2xl">12</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold">Total Orders</h2>
          <p className="text-2xl">35</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-semibold">Pending Approvals</h2>
          <p className="text-2xl">4</p>
        </div>
      </div>
    </div>
  );
}