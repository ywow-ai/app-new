import { useTransition, useEffect } from "react";
import { useLocation } from "react-router";

interface MainContentAreaProps {
  children: React.ReactNode;
}

export const MainContentArea = ({ children }: MainContentAreaProps) => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  useEffect(() => {
    startTransition(() => {
      // Smooth transition when route changes
    });
  }, [location]);

  return (
    <main className="flex-1 overflow-auto">
      {/* Global loading indicator */}
      {isPending && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
          <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Content with transition effect */}
      <div
        className={`
          transition-opacity duration-300 ease-in-out
          ${isPending ? "opacity-70" : "opacity-100"}
        `}
      >
        <div className="p-4 md:p-6 pb-20 md:pb-6">{children}</div>
      </div>
    </main>
  );
};
