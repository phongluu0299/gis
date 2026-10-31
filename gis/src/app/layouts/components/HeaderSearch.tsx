import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "@/stores/sidebarStore";
import { findParentGroupByPath } from "@/app/layouts/constants/menuItems";
import {
  flattenMenuLinks,
  menuItems,
} from "@/app/layouts/constants/menuItems";

export default function HeaderSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { setOpenGroup } = useSidebarStore();
  const pages = useMemo(() => flattenMenuLinks(menuItems), []);

  const filteredPages = pages.filter((page) =>
    page.label.toLowerCase().includes(keyword.toLowerCase()),
  );

  const showDropdown = keyword.trim().length > 0;

  return (
    <div className="relative w-[360px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Tìm kiếm trang..."
        className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-indigo-50"
      />

      {showDropdown && (
        <div className="absolute left-0 top-11 z-50 w-full overflow-hidden rounded-xl bg-white shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => {
              const Icon = page.icon;

              return (
                <button
                  key={page.path}
                  type="button"
                  onClick={() => {
                    const parentGroup = findParentGroupByPath(menuItems, page.path);
                  
                    setOpenGroup(parentGroup);
                    navigate(page.path);
                    setKeyword("");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon className="h-4 w-4 shrink-0" />

                  <span className="truncate">{page.label}</span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400">
              Không tìm thấy trang phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
}