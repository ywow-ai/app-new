import { useEffect } from "react";
import { useFetchWithTransition } from "@/hooks/useFetchWithTransition";
import { dashboardApi } from "@/lib/api";
import { AnimatedStatsCard } from "@/components/dashboard/AnimatedStatsCard";
import { Users, ShoppingCart, FileText, UserCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalPosts: number;
  activeUsers: number;
  userGrowth: number;
  productGrowth: number;
  postGrowth: number;
}

export const DashboardPage = () => {
  const { data, isLoading, fetchData, error } =
    useFetchWithTransition<DashboardStats>();

  useEffect(() => {
    fetchData(() => dashboardApi.getStats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="dashboard-title">
            Dashboard
          </h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading dashboard: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <AnimatedStatsCard
              title="Total Users"
              value={data?.totalUsers || 0}
              change={data?.userGrowth}
              isLoading={isLoading}
              icon={<Users className="h-5 w-5" />}
            />
            <AnimatedStatsCard
              title="Total Products"
              value={data?.totalProducts || 0}
              change={data?.productGrowth}
              isLoading={isLoading}
              icon={<ShoppingCart className="h-5 w-5" />}
            />
            <AnimatedStatsCard
              title="Total Posts"
              value={data?.totalPosts || 0}
              change={data?.postGrowth}
              isLoading={isLoading}
              icon={<FileText className="h-5 w-5" />}
            />
            <AnimatedStatsCard
              title="Active Users"
              value={data?.activeUsers || 0}
              isLoading={isLoading}
              icon={<UserCheck className="h-5 w-5" />}
            />
          </>
        )}
      </div>

      {/* Additional Content Area */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your dashboard is showing real-time statistics from the API.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Users</p>
                  <p className="text-2xl font-bold">{data?.totalUsers || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="text-2xl font-bold">
                    {data?.totalProducts || 0}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Posts</p>
                  <p className="text-2xl font-bold">{data?.totalPosts || 0}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
