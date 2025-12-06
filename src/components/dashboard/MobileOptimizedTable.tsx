import { useState, useMemo, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface MobileOptimizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export const MobileOptimizedTable = <T extends { id?: string | number }>({
  data,
  columns,
  isLoading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  onRowClick,
  className,
}: MobileOptimizedTableProps<T>) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filter data dengan transition
  const filteredData = useMemo(() => {
    if (!filter) return data;

    return data.filter((item) => {
      return columns.some((col) => {
        const value = col.accessor(item);
        return String(value)
          .toLowerCase()
          .includes(filter.toLowerCase());
      });
    });
  }, [data, filter, columns]);

  // Sort data dengan transition
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const col = columns.find((c) => c.key === sortConfig.key);
      if (!col) return 0;

      const aValue = col.accessor(a);
      const bValue = col.accessor(b);

      const aStr = String(aValue ?? "");
      const bStr = String(bValue ?? "");

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig, columns]);

  const handleFilterChange = (value: string) => {
    startTransition(() => {
      setFilter(value);
    });
  };

  const handleSort = (key: string) => {
    startTransition(() => {
      if (sortConfig?.key === key) {
        setSortConfig({
          key,
          direction: sortConfig.direction === "asc" ? "desc" : "asc",
        });
      } else {
        setSortConfig({ key, direction: "asc" });
      }
    });
  };

  // Mobile card view
  const MobileCardView = () => (
    <div className="space-y-3">
      {sortedData.map((row, index) => (
        <Card
          key={row.id || index}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            onRowClick && "hover:bg-muted/50"
          )}
          onClick={() => onRowClick?.(row)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {columns[0]?.accessor(row)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {columns.slice(1).map((col) => (
              <div key={col.key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{col.header}:</span>
                <span className="font-medium">{col.accessor(row)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Desktop table view
  const DesktopTableView = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  col.sortable && "cursor-pointer select-none hover:bg-muted/50",
                  "transition-colors"
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-2">
                  {col.header}
                  {col.sortable && sortConfig?.key === col.key && (
                    <span className="text-xs">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              key={row.id || index}
              className={cn(
                onRowClick && "cursor-pointer hover:bg-muted/50",
                "transition-colors"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>{col.accessor(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {searchable && <Skeleton className="h-10 w-full" />}
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative space-y-4", className)}>
      {/* Search input */}
      {searchable && (
        <Input
          type="text"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full"
        />
      )}

      {/* Loading overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-background/50 flex items-center justify-center transition-all duration-200 z-10",
          isPending
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>

      {/* Table container - NO PADDING di mobile */}
      <div
        className={cn(
          "transition-opacity duration-200",
          isPending ? "opacity-50 blur-sm" : "opacity-100",
          isMobile ? "w-screen -mx-4 px-4 overflow-x-auto" : "w-full"
        )}
      >
        {isMobile ? <MobileCardView /> : <DesktopTableView />}
      </div>

      {/* Empty state */}
      {sortedData.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No data found
        </div>
      )}
    </div>
  );
};

