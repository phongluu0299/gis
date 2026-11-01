import type { Result } from "@/types/basetype";
import type { RanhGioi } from "../types/map.types";
import { axiosClient } from "@/lib/axios";
import type { LegendItem } from "../types/map.types";

export const mapService = {
  getAll: async (): Promise<Result<RanhGioi[]>> => {
    const response = await axiosClient.get<Result<RanhGioi[]>>("/ranhgioi/all");
    return response.data;
  },
  getAllLegend: async (): Promise<Result<LegendItem[]>> => {
    const response = await axiosClient.get<Result<LegendItem[]>>("/legend/all");
    return response.data;
  },
};
