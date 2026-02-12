export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome Back 👋</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-background p-6 rounded-xl border shadow-sm">
          Total Users: 120
        </div>

        <div className="bg-background p-6 rounded-xl border shadow-sm">
          Active Orders: 35
        </div>

        <div className="bg-background p-6 rounded-xl border shadow-sm">
          Revenue: ₹45,000
        </div>
      </div>
    </div>
  );
}
