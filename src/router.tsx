import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MasterPage } from "@/pages/MasterPage";
import { HumanCapitalPage } from "@/pages/HumanCapitalPage";
import { TAFPage } from "@/pages/TAFPage";
import { CorpCompPage } from "@/pages/CorpCompPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { ProfilePage } from "@/pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/master",
            element: <MasterPage />,
          },
          {
            path: "/human-capital",
            element: <HumanCapitalPage />,
          },
          {
            path: "/taf",
            element: <TAFPage />,
          },
          {
            path: "/corpcomp",
            element: <CorpCompPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
