import type { Result } from "@/types/basetype";
import type { ParamListPermission, ListPermission, CreatePermission } from "../types/permission.types";
import { axiosClient } from "@/lib/axios";
export const permissionService = {
    create: async (payload: CreatePermission): Promise<Result<number>> => {
        const response = await axiosClient.post<Result<number>>("/permission", payload);
        if (response.data.code >= 400) {
            throw new Error(response.data.message || "Không thể thêm quyền");
        }
        return response.data;
    },

    update: async (payload: CreatePermission, id: number): Promise<Result<number>> => {
        const response = await axiosClient.put<Result<number>>(`/permission/${id}`, payload);
        if (response.data.code >= 400) {
            throw new Error(response.data.message || "Không thể cập nhật quyền");
        }
        return response.data;
    },

    get: async (param: ParamListPermission): Promise<Result<ListPermission[]>> => {
        const response = await axiosClient.get<Result<ListPermission[]>>("/permission", { params: param });
        return response.data;
    },
    getById: async (id: number): Promise<Result<CreatePermission>> => {
        const response = await axiosClient.get<Result<CreatePermission>>(`/permission/${id}`);
        return response.data;
    }
};
