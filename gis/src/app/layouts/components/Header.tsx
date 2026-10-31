import UserDropdown from "./UserDropdown";
import { NavLink } from "react-router-dom";

import { menuItems } from "../constants/menuItems";
export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between rounded-xl bg-white px-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-4">
        <div className="flex px-3 gap-0.5 ">
          <div className="relative rounded-2xl bg-[var(--color-primary)] text-xl font-bold text-white shadow-lg shadow-indigo-200">
            <img src="/src/assets/react.svg" alt="" />
          </div>

          <div className="overflow-hidden whitespace-nowrap transition-all duration-300 max-w-45 opacity-100">
            <div className="text-xl font-bold text-(var(--color-primary))">
              <NavLink to="/">BẢN ĐỒ SỐ</NavLink>
            </div>
          </div>
        </div>
        <div className="relative flex flex-column gap-1">
          {menuItems.map((item) => item.type === "link" && (
            
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "text-(--color-primary)"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="overflow-hidden whitespace-nowrap transition-all duration-300">
                {item.label}
              </span>
            </NavLink>
          ))}
      
        </div>
      </div>
      <div className="flex items-center gap-4">
        <UserDropdown />
      </div>
    </header>
  );
}
