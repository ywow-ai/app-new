import { Outlet } from "react-router";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Header } from "./Header";
import { MainContentArea } from "./MainContentArea";

export const RootLayout = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex flex-col md:pl-64">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <MainContentArea>
          <Outlet />
        </MainContentArea>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
