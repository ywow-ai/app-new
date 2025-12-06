import { useState, useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimatedStatsCardProps {
  title: string;
  value: number;
  change?: number;
  isLoading?: boolean;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AnimatedStatsCard = ({
  title,
  value,
  change,
  isLoading = false,
  prefix = "",
  suffix = "",
  icon,
  className,
}: AnimatedStatsCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Animate value change dengan transition
  useEffect(() => {
    if (!isLoading && value !== undefined) {
      const duration = 1000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          startTransition(() => {
            setDisplayValue(value);
          });
          clearInterval(timer);
        } else {
          startTransition(() => {
            setDisplayValue(Math.floor(current));
          });
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, isLoading, startTransition]);

  return (
    <div
      className={cn(
        "bg-card rounded-lg border p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        isPending ? "opacity-70" : "opacity-100",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {isLoading ? (
            <Skeleton className="h-8 w-20 mt-2" />
          ) : (
            <div className="mt-2">
              <div className="text-2xl md:text-3xl font-bold">
                {prefix}
                {displayValue.toLocaleString()}
                {suffix}
              </div>
              {change !== undefined && (
                <div
                  className={cn(
                    "text-sm mt-1 inline-flex items-center transition-colors duration-200",
                    change > 0
                      ? "text-green-600 dark:text-green-400"
                      : change < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground"
                  )}
                >
                  {change > 0 ? "↑" : change < 0 ? "↓" : "→"}{" "}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground opacity-70">{icon}</div>
        )}
        {isLoading && (
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        )}
      </div>
    </div>
  );
};

