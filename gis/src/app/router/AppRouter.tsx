import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";

import ErrorPage from "@/features/errors/pages/ErrorPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ReportPage from "@/features/report/pages/ReportPage";
import MapPage from "@/features/map/pages/MapPage"; 
import Permission from "@/features/permission/pages/Permission";
const router = createBrowserRouter([
 
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <ReportPage />,
          },
          {
            index: true,
            path: "/permission-group",
            element: <Permission />,
          },
          {
            index: true,
            path: "/permission-user",
            element: <Permission />,
          },
          {
            index: true,
            path: "/user",
            element: <Permission />,
          },
          {
            index: true,
            path: "/map",
            element: <MapPage />,
          }
        ],
      
      },

    ],
    
  },
  {
    path: "*",
    element: <ErrorPage status={404} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
