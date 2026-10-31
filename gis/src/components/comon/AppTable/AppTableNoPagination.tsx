import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AppTableEmpty from "./AppTableEmpty";

type AppTableNoPaginationProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  isloading?: boolean;
};

export default function AppTableNoPagination<TData>({
  data,
  columns,
  isloading = false,
}: AppTableNoPaginationProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const formatCellValue = (value: unknown, format?: "number" | "percent") => {
    if (value == null) return "";

    if (format === "number" && typeof value === "number") {
      return new Intl.NumberFormat("vi-VN").format(value);
    }

    if (format === "percent") {
      return `${value}%`;
    }

    return String(value);
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="select-none px-6 py-4 text-left text-sm font-semibold text-slate-700"
                    style={{ width: header.column.columnDef.meta?.width }}
                  >
                    <div className="flex cursor-pointer items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {{
                        asc: "↑",
                        desc: "↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isloading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  <Button variant="outline" disabled>
                    <Spinner className="mr-2" />
                    Loading...
                  </Button>
                </td>
              </tr>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-slate-700"
                      style={{ width: cell.column.columnDef.meta?.width }}
                    >
                      {
                     
                      cell.column.columnDef.meta?.format
                        ? formatCellValue(
                            cell.getValue(),
                            cell.column.columnDef.meta?.format,
                          )
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <AppTableEmpty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
