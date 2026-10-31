import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

type AppTablePaginationProps<TData> = {
  table: Table<TData>;
};

function getPaginationItems(currentPage: number, pageCount: number) {
  const pages = new Set<number>();

  pages.add(0);
  pages.add(pageCount - 1);
  pages.add(currentPage - 1);
  pages.add(currentPage);
  pages.add(currentPage + 1);

  const validPages = Array.from(pages)
    .filter((page) => page >= 0 && page < pageCount)
    .sort((a, b) => a - b);

  return validPages.flatMap((page, index) => {
    const previousPage = validPages[index - 1];

    if (index > 0 && page - previousPage > 1) {
      return ["ellipsis", page] as const;
    }

    return [page] as const;
  });
}

export default function AppTablePagination<TData>({
  table,
}: AppTablePaginationProps<TData>) {
  const [pageInput, setPageInput] = useState("");

  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const handlePageInputSubmit = () => {
    const value = Number(pageInput);
    setPageInput("");
    if (Number.isNaN(value)) return;

    if (value <= 0) {
      table.setPageIndex(0);
      return;
    }

    if (value > pageCount) {
      table.setPageIndex(pageCount - 1);
      return;
    }

    table.setPageIndex(value - 1);
  };

  return (
    <div className="grid grid-cols-3 items-center border-t border-slate-100 px-6 py-4">
      <div className="flex items-center gap-2 text-[13px] text-slate-500">
        <span>Rows per page</span>

        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            className="
      h-8 w-20 rounded-xl border-slate-200
      bg-white text-[13px] shadow-none
    "
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            className="
      rounded-2xl border-0
      shadow-[0_16px_40px_rgba(15,23,42,0.12)]
    "
          >
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={pageInput}
          onChange={(event) => setPageInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handlePageInputSubmit();
            }
          }}
          placeholder="Page"
          className="h-8 w-14 rounded-lg border border-slate-200 bg-white px-2 text-center text-[12px] outline-none transition focus:border-(--color-primary)"
        />
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPaginationItems(currentPage, pageCount).map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-[13px] text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => table.setPageIndex(item)}
              className={[
                "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] transition",
                currentPage === item
                  ? "bg-(--color-primary) text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {item + 1}
            </button>
          )
        )}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <div className="text-right text-[13px] text-slate-500">
        Page {currentPage + 1} of {pageCount}
      </div>
    </div>
  );
}
