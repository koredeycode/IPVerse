export default async function Dashboard() {
  // Mock analytics (replace with real data from SDK)
  const analytics = { views: 100, revenue: 5 };
  console.log("rendering dashboard");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Creator Dashboard</h1>
      <div className="mt-4">
        <p>
          Views: {analytics.views} | Revenue: {analytics.revenue} CAMP
        </p>
        <a
          href="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Create Content
        </a>
        <a href="/search" className="bg-blue-500 text-white px-4 py-2 rounded">
          Explore
        </a>
      </div>
    </div>
  );
}
