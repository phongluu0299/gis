import { axiosClient } from "@/lib/axios";
import type { GetUserDTO } from "../types/usertype";

export const userService = {

  get: async (): Promise<GetUserDTO[]> => {
    const response = await axiosClient.get<GetUserDTO[]>("/users");
    return response.data;
  },

};