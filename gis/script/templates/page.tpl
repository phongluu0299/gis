import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { {{camelName}}Service } from "../services/{{name}}.service";
import type {
  {{componentName}}Request,
  {{componentName}}Response,
} from "../types/{{name}}.types";

// TODO: Import filter và columns khi đã tạo.
// import AppTableNoPagination from "@/components/comon/AppTable/AppTableNoPagination";

const defaultFilters: {{componentName}}Request = {
  // TODO: Giá trị bộ lọc mặc định.
};

const EMPTY_REPORTS: {{componentName}}Response[] = [];

export default function {{componentName}}() {
  const [searchParams, setSearchParams] =
    useState<{{componentName}}Request>(defaultFilters);

  // TODO: Bỏ comment khi service đã có hàm get.
  /*
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ["{{name}}", "get", searchParams],
    queryFn: () => {{camelName}}Service.get(searchParams),
    staleTime: 5 * 60 * 1000,
  });

  const reports = data?.data ?? EMPTY_REPORTS;

  useEffect(() => {
    if (data && data.code >= 400) {
      toast.error(data.message || "Có lỗi xảy ra", {
        id: "{{name}}-error",
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Có lỗi xảy ra", {
        id: "{{name}}-error",
      });
    }
  }, [isError, error]);
  */

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          {/* TODO: Tiêu đề trang */}
        </h1>

        <div className="mt-2"></div>
      </div>

      {/* TODO: Filter
        Truyền các props:
        setSearchParams, searchParams, refetch,
        isFetching, defaultFilters.
      */}

      <div
        className="
          overflow-hidden rounded-3xl bg-white
          shadow-[0_16px_40px_rgba(15,23,42,0.06)]
        "
      >
        {/* TODO: Bỏ comment khi đã có query và columns.
        <AppTableNoPagination
          data={reports}
          columns={columns}
          isloading={isLoading}
        />
        */}
      </div>
    </div>
  );
}