import { useEffect, useState } from "react";
import { useFetchWithTransition } from "@/hooks/useFetchWithTransition";
import { masterDataApi } from "@/lib/api";
import { MobileOptimizedTable } from "@/components/dashboard/MobileOptimizedTable";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  username: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const MasterPage = () => {
  const [page, setPage] = useState(0);
  const limit = 20;
  const { data, isLoading, fetchData, refetch } =
    useFetchWithTransition<UsersResponse>();

  useEffect(() => {
    fetchData(() => masterDataApi.getUsers(limit, page * limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const columns = [
    {
      key: "name",
      header: "Name",
      accessor: (row: User) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      accessor: (row: User) => row.email,
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      accessor: (row: User) => row.phone,
      sortable: false,
    },
    {
      key: "age",
      header: "Age",
      accessor: (row: User) => row.age,
      sortable: true,
    },
    {
      key: "username",
      header: "Username",
      accessor: (row: User) => row.username,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            data-testid="master-title"
          >
            Master Data
          </h1>
          <p className="text-muted-foreground">
            Manage your master data and records
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-4 md:p-6">
        {data && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {data.users.length} of {data.total} users
          </div>
        )}
        <MobileOptimizedTable
          data={data?.users || []}
          columns={columns}
          isLoading={isLoading}
          searchable={true}
          searchPlaceholder="Search users..."
          onRowClick={(row) => {
            console.log("Row clicked:", row);
          }}
        />

        {/* Pagination */}
        {data && data.total > limit && (
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {Math.ceil(data.total / limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * limit >= data.total}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
