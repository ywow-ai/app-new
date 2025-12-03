import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Database,
  User,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, ClipboardList, Building2, Settings } from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Master", href: "/master", icon: Database },
];

const moreNav = [
  { name: "Human Capital", href: "/human-capital", icon: Users },
  { name: "TAF", href: "/taf", icon: ClipboardList },
  { name: "CorpComp", href: "/corpcomp", icon: Building2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  const isMoreActive = moreNav.some((item) => location.pathname === item.href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-2">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full transition-colors",
            location.pathname === "/dashboard"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          data-testid="bottom-nav-dashboard"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        {/* Master */}
        <Link
          to="/master"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full transition-colors",
            location.pathname === "/master"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          data-testid="bottom-nav-master"
        >
          <Database className="h-5 w-5" />
          <span className="text-xs mt-1">Master</span>
        </Link>

        {/* More Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isMoreActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid="bottom-nav-more"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs mt-1">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[50vh]">
            <SheetHeader>
              <SheetTitle>More Options</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-4">
              {moreNav.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12",
                      isActive && "bg-secondary"
                    )}
                    asChild
                  >
                    <Link to={item.href} data-testid={`more-nav-${item.name.toLowerCase().replace(" ", "-")}`}>
                      <item.icon className="mr-3 h-5 w-5" />
                      <span className="text-base">{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Profile */}
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full transition-colors",
            location.pathname === "/profile"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          data-testid="bottom-nav-profile"
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};
