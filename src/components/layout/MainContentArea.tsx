import { useTransition, useEffect } from "react";
import { useLocation } from "react-router";
import { GlobalLoadingBar } from "./GlobalLoadingBar";

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
  }, [location, startTransition]);

  return (
    <main className="flex-1 overflow-auto relative">
      <GlobalLoadingBar isPending={isPending} />

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
