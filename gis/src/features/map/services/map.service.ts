import type { Result } from "@/types/basetype";
import type { RanhGioi } from "../types/map.types";
import { axiosClient } from "@/lib/axios";

export const mapService = {

    getAll: async (): Promise<Result<RanhGioi[]>> => {
        const response = await axiosClient.get<Result<RanhGioi[]>>("/ranhgioi/all");
        return response.data;
      },
};

