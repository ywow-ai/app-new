export const MasterPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="master-title">
          Master Data
        </h1>
        <p className="text-muted-foreground">
          Manage your master data and records
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Master data table will be implemented with static data
        </p>
      </div>
    </div>
  );
};
