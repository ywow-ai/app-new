import { useTransition, useEffect } from "react";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

interface GlobalLoadingBarProps {
  isPending?: boolean;
}

export const GlobalLoadingBar = ({ isPending: externalPending }: GlobalLoadingBarProps) => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  useEffect(() => {
    startTransition(() => {
      // Smooth transition when route changes
    });
  }, [location, startTransition]);

  const showLoading = externalPending !== undefined ? externalPending : isPending;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden transition-opacity duration-300",
        showLoading ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={cn(
          "h-full bg-linear-to-r from-primary to-primary/80 transition-transform duration-300 ease-out",
          showLoading
            ? "translate-x-0 animate-[loading_1.5s_ease-in-out_infinite]"
            : "-translate-x-full"
        )}
      />
    </div>
  );
};

