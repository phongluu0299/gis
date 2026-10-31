import { axiosClient } from "@/lib/axios";
import type { Option } from "../types/basetype";

export const optionService = {

  unitOptions: async (): Promise<Option[]> => {
    const response = await axiosClient.get<Option[]>("/options/unit");
    return response.data;
  },
  appOptions: async (): Promise<Option[]> => {
    const response = await axiosClient.get<Option[]>("/options/app");
    return response.data;
  },
  serviceOptions: async (): Promise<Option[]> => {
    const response = await axiosClient.get<Option[]>("/options/service");
    return response.data;
  },

};