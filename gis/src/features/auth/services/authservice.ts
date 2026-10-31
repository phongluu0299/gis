import { axiosClient } from "@/lib/axios";
import type { Result } from "@/types/basetype";
import type { LoginResponse } from "../types/authtype";

export type LoginRequest = {
  username: string;
  password: string;
};

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await axiosClient.post<Result<LoginResponse>>("/auth/login", data);

    return response.data;
  },

  me: async () => {
    const response = await axiosClient.get("/auth/me");
    return response.data ?? null;
  },

  logout: async () => {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
  }
};