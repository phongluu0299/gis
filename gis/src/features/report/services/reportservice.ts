import { axiosClient } from "@/lib/axios";
import type { ReportResponse  , ReportRequest } from "../types/reporttype";
import type { Result, ExportFileResponse } from "@/types/basetype";
export const reportService = {

  get: async (param: ReportRequest): Promise<Result<ReportResponse[]>> => {
    const response = await axiosClient.get<Result<ReportResponse[]>>("/reports", { params: param });
    return response.data;
  },
  export: async (body: ReportRequest): Promise<Result<ExportFileResponse>> => {
    const response = await axiosClient.post<Result<ExportFileResponse>>("/reports/export", body );
    return response.data;
  },
};