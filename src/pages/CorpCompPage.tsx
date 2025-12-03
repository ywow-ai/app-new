export const CorpCompPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="corpcomp-title">
          Corporate Compliance
        </h1>
        <p className="text-muted-foreground">
          Company documents, compliance status, and meeting schedules
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Documents
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Compliance Status
          </h3>
          <p className="text-2xl font-bold mt-2">100%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Upcoming Meetings
          </h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Document Management</h2>
        <p className="text-muted-foreground">
          Document and compliance data will be implemented with static data
        </p>
      </div>
    </div>
  );
};
