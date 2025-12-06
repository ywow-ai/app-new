import { cn } from "@/lib/utils";

interface TransitionLoaderProps {
  isPending: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const TransitionLoader = ({
  isPending,
  className,
  size = "md",
}: TransitionLoaderProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-in-out",
        isPending
          ? "opacity-100 z-50 pointer-events-auto"
          : "opacity-0 pointer-events-none -z-10",
        className
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-b-2 border-primary border-t-transparent",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

