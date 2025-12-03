export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="dashboard-title">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard overview
        </p>
      </div>

      {/* Placeholder - akan diisi dengan widgets nanti */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-sm font-medium text-muted-foreground">
              Stat Card {i}
            </h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Content Area</h2>
        <p className="text-muted-foreground">
          Dashboard content will be implemented in Phase 4
        </p>
      </div>
    </div>
  );
};
