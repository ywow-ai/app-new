export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="settings-title">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your application preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <p className="text-muted-foreground">
            Settings options will be implemented
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p className="text-muted-foreground">
            Notification preferences will be implemented
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
          <p className="text-muted-foreground">
            Privacy settings will be implemented
          </p>
        </div>
      </div>
    </div>
  );
};
