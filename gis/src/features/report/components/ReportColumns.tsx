import type { ReportResponse } from "../types/reporttype";
import type { ColumnDef } from "@tanstack/react-table";

export const reportColumns: ColumnDef<ReportResponse>[] = [
      {
        header: "#",
        cell: ({ row }) => row.index + 1,
        meta: {
          width: "5%",
          
        },
      },
      {
        accessorKey: "unitName",
        header: "Đơn vị",
        meta: {
          width: "15%",
          
        },
      },
      {
        accessorKey: "appName",
        header: "Ứng dụng",
        meta: {
          width: "15%",
        },
      },
      {
        accessorKey: "serviceName",
        header: "Dịch vụ",
        meta: {
          width: "15%",
        },
      },
      {
        accessorKey: "request",
        header: "Số giao dịch",
        meta: {
          width: "10%",
          format: "number",
        },
      },
      {
        accessorKey: "responseOk",
        header: "GD thành công",
        meta: {
          width: "10%",
          format: "number",
        },
      },

      {
        accessorKey: "successRate",
        header: "Tỷ lệ GDTC",
        cell: ({ row }) => {
          const successRate = new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(row.original.successRate);

          return (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {successRate}%
            </span>
          );
        },
        meta: {
          width: "10%",
        },
      },
      {
        accessorKey: "responseNOk",
        header: "GD thất bại",
        meta: {
          width: "10%",
          format: "number",
        },
      },
      {
        accessorKey: "failureRate",
        header: "Tỷ lệ GDTB",
        cell: ({ row }) => {
          const failureRate = new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(row.original.failureRate);
          return (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-red-600">
              {failureRate}%
            </span>
          );
        },
        meta: {
          width: "10%",
        },
      },
];