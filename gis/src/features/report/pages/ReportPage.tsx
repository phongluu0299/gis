import { reportService } from "../services/reportservice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { ReportRequest, ReportResponse } from "../types/reporttype";
import dayjs from "dayjs";
import { toast } from "sonner";
import AppTableNoPagination from "@/components/comon/AppTable/AppTableNoPagination";
import { downloadBase64File } from "@/utils/downloadBase64File";
import ReportMainFiltert from "../components/ReportMainFiltert";
import { reportColumns } from "../components/ReportColumns";

const fromDateDefault = dayjs().startOf("month").format("YYYY-MM-DD");
const todayDefault = dayjs().format("YYYY-MM-DD");
const defaultFilters: ReportRequest = {
  environment: "-1",
  unitId: -1,
  serviceId: -1,
  appId: -1,
  fromDate: fromDateDefault,
  toDate: todayDefault,
  fromQuarter: -1,
  toQuarter: -1,
  fromMonth: -1,
  toMonth: -1,
  year: -1,
};

const EMPTY_REPORTS: ReportResponse[] = [];
export default function ReportPage() {
  const [searchParams, setSearchParams] =
    useState<ReportRequest>(defaultFilters);
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ["report", "get", searchParams],
    queryFn: () => reportService.get(searchParams),
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: exportReport, isPending: isExporting } = useMutation({
    mutationFn: (body: ReportRequest) => reportService.export(body),

    onSuccess: (result) => {
      if (result.code !== 200) {
        toast.error(result.message || "Xuất báo cáo thất bại", {
          id: "report-export-error",
        });
        return;
      }

      downloadBase64File(result.data);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Xuất báo cáo thất bại", {
        id: "report-export-error",
      });
    },
  });

  const reports = data?.data || EMPTY_REPORTS;
  useEffect(() => {
    if (data && data.code >= 400) {
      toast.error(data.message || "Có lỗi xảy ra", {
        id: "report-error",
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Có lỗi xảy ra", {
        id: "report-error",
      });
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Báo cáo</h1>

        <div className="mt-2"></div>
      </div>

      <ReportMainFiltert
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        refetch={refetch}
        isFetching={isFetching}
        isExporting={isExporting}
        exportReport={exportReport}
        defaultFilters={defaultFilters}
      />

      <div
        className="
          overflow-hidden rounded-3xl bg-white
          shadow-[0_16px_40px_rgba(15,23,42,0.06)]
        "
      >
        <AppTableNoPagination
          data={reports}
          columns={reportColumns}
          isloading={isLoading}
        />
      </div>
    </div>
  );
}
