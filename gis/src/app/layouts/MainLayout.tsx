import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";
import AppBreadcrumb from "./components/AppBreadcrumb";
export default function MainLayout() {

  return (
    
    <div className=" transition-all duration-300 p-1">
      <div className="">
        <div className="p-2">
          <Header />

          <main className="mt-5 flex-1 min-h-0 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
