import {
  ChevronDown,
} from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore";
import { NavLink } from "react-router-dom";
import { menuItems } from "../constants/menuItems";


export default function Sidebar() {
  const { collapsed, openGroup, toggleGroup } = useSidebarStore();

  return (
    <aside
      className={[
        "fixed left-0 top-0 h-screen bg-white shadow-[8px_0_30px_rgba(15,23,42,0.06)] transition-all duration-300",
        collapsed ? "w-16" : "w-72",
      ].join(" ")}
    >
      <div className="flex h-full flex-col px-[5px] py-6">
        <div
          className={["flex px-3", collapsed ? "items-center" : " gap-3"].join(
            " "
          )}
        >
          <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-xl font-bold text-white shadow-lg shadow-indigo-200">
            LGSP
          </div>

          <div
            className={[
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              collapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100",
            ].join(" ")}
          >
            <div className="text-xl font-bold text-slate-950">Trục liên thông</div>
            <div className="text-sm text-slate-500">Báo cáo LGSP</div>
          </div>
        </div>

        <nav className="mt-12 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.type === "link") {
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                    ].join(" ")
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
            
                  <span
                    className={[
                      "overflow-hidden whitespace-nowrap transition-all duration-300",
                      collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            }

            const isOpen = openGroup === item.label;

            return (
              <div key={item.label} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(item.label)}
                  className="flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <div
                    className={[
                      "flex flex-1 items-center justify-between overflow-hidden transition-all duration-300",
                      collapsed
                        ? "max-w-0 opacity-0"
                        : "ml-4 max-w-[220px] opacity-100",
                    ].join(" ")}
                  >
                    <span className="text-left">{item.label}</span>

                    <ChevronDown
                      className={[
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </div>
                </button>

                <div
                  className={[
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && isOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 pl-4">
                    {item.children.map((child) => {
                      if (child.type !== "link") return null;

                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                        key={child.label}
                        to={child.path}
                        className={({ isActive }) =>
                          [
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                            isActive
                              ? "bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]"
                              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                          ].join(" ")
                        }
                      >
                        <ChildIcon className="h-4 w-4 shrink-0" />
                      
                        <span className=" text-left">
                          {child.label}
                        </span>
                      </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
