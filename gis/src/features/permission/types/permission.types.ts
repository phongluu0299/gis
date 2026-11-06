export type ParamListPermission = {
    permissionName?: string;
};

export type CreatePermission = {
    permissionName: string;
    description?: string;
};

export type ListPermission = {
    permissionID: number;
    permissionName: string;
    description?: string;
};
