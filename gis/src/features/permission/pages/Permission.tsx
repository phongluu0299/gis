import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { permissionService } from "../services/permission.service";
import type {
  PermissionRequest,
  PermissionResponse,
} from "../types/permission.types";

// TODO: Import filter và columns khi đã tạo.
// import AppTableNoPagination from "@/components/comon/AppTable/AppTableNoPagination";

const defaultFilters: PermissionRequest = {
  // TODO: Giá trị bộ lọc mặc định.
};

const EMPTY_REPORTS: PermissionResponse[] = [];

export default function Permission() {
  const [searchParams, setSearchParams] =
    useState<PermissionRequest>(defaultFilters);

  // TODO: Bỏ comment khi service đã có hàm get.
  /*
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ["permission", "get", searchParams],
    queryFn: () => permissionService.get(searchParams),
    staleTime: 5 * 60 * 1000,
  });

  const reports = data?.data ?? EMPTY_REPORTS;

  useEffect(() => {
    if (data && data.code >= 400) {
      toast.error(data.message || "Có lỗi xảy ra", {
        id: "permission-error",
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Có lỗi xảy ra", {
        id: "permission-error",
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