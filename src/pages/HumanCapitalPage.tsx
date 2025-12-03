export const HumanCapitalPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="human-capital-title">
          Human Capital
        </h1>
        <p className="text-muted-foreground">
          Employee management, attendance, and payroll
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Employees
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Present Today
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            On Leave
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Employee List</h2>
        <p className="text-muted-foreground">
          Employee data table will be implemented with static data
        </p>
      </div>
    </div>
  );
};
