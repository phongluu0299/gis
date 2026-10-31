import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AppTablePagination from "./AppTablePagination";
import AppTableEmpty from "./AppTableEmpty";

type AppTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  isloading?: boolean;
};

export default function AppTable<TData>({
  data,
  columns,
  isloading = false,
}: AppTableProps<TData>) {
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="select-none px-6 py-4 text-left text-sm font-semibold text-slate-700"
                  >
                    <div className="flex cursor-pointer items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) :  (
              <tr>
                <td colSpan={columns.length}>
                  <AppTableEmpty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AppTablePagination table={table} />
    </>
  );
}
