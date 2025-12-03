export const TAFPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="taf-title">
          TAF (Task & Finance)
        </h1>
        <p className="text-muted-foreground">
          Project timelines, task completion, and budget allocation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Projects
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Task Completion
          </h3>
          <p className="text-2xl font-bold mt-2">0%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Budget Used
          </h3>
          <p className="text-2xl font-bold mt-2">$0</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
        <p className="text-muted-foreground">
          Project and task data will be implemented with static data
        </p>
      </div>
    </div>
  );
};
