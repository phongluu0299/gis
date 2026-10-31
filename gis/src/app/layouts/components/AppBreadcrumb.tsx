import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { menuItems } from "@/app/layouts/constants/menuItems";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

function findBreadcrumbs(
  items: any[],
  pathname: string,
  parents: BreadcrumbItem[] = []
): BreadcrumbItem[] {
  for (const item of items) {
    if (item.type === "link") {
      if (item.path === pathname) {
        return [
          ...parents,
          {
            label: item.label,
            path: item.path,
          },
        ];
      }
    }

    if (item.type === "group") {
      const result = findBreadcrumbs(
        item.children,
        pathname,
        [
          ...parents,
          {
            label: item.label,
          },
        ]
      );

      if (result.length) {
        return result;
      }
    }
  }

  return [];
}

export default function AppBreadcrumb() {
  const location = useLocation();

  const breadcrumbs = findBreadcrumbs(
    menuItems,
    location.pathname
  );

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-slate-500">
      <Link
        to="/"
        className="
          flex items-center gap-1 transition
          hover:text-slate-900
        "
      >
        <Home className="h-4 w-4" />

        Trang chủ
      </Link>

      {breadcrumbs.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4 text-slate-400" />

          {item.path ? (
            <Link
              to={item.path}
              className="
                transition hover:text-slate-900
              "
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}