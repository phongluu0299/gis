import type { Result } from "@/types/basetype";
import type { PipeLine, RanhGioi, WaterMeter, WaterMeterByBound, WaterSupplyStation } from "../types/map.types";
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
  getAllPipeLine: async (): Promise<Result<PipeLine[]>> => {
    const response = await axiosClient.get<Result<PipeLine[]>>("/pipeline/all");
    return response.data;
  },
  getAllWaterSupplyStation: async (): Promise<Result<WaterSupplyStation[]>> => {
    const response = await axiosClient.get<Result<WaterSupplyStation[]>>("/watersupplystation/all");
    return response.data;
  },
  getWaterMeterByBound: async (bound: L.LatLngBounds): Promise<Result<WaterMeterByBound[]>> => {

    const west = bound.getWest();
    const east = bound.getEast();
    const north = bound.getNorth();
    const south = bound.getSouth();
    const response = await axiosClient.get<Result<WaterMeterByBound[]>>(`/watermeter/by-bound?west=${west}&east=${east}&north=${north}&south=${south}`);
    return response.data;
  },
  getWaterMeterById: async (id: number): Promise<Result<WaterMeter>> => {
    const response = await axiosClient.get<Result<WaterMeter>>(`/watermeter/${id}`);
    return response.data;
  },
};
