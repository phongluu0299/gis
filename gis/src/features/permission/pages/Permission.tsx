import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { permissionService } from "../services/permission.service";
import type {
  ListPermission,
  ParamListPermission,
} from "../types/permission.types";

import {permissionColumns} from "../components/PermissionColumns";
import { AppTable } from "@/components/comon/AppTable";
import PermissionFilter from "../components/PermissionFilter";
import AddPermissionDialog from "../components/AddPermissionDialog";
import { Button } from "@/components/ui/button";

import {RotateCw} from "lucide-react";
import EditPermissionDialog from "../components/EditPermissionDialog";
const defaultFilters: ParamListPermission = {
  permissionName: "",
};

const EMPTY_DATA: ListPermission[] = [];

export default function Permission() {
  const [searchParams, setSearchParams] =
    useState<ParamListPermission>(defaultFilters);

  
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ["permission", "get", searchParams],
    queryFn: () => permissionService.get(searchParams),
    staleTime: 5 * 60 * 1000,
  });

  const permissions = data?.data ?? EMPTY_DATA;

  useEffect(() => {
    if (data && data.code >= 400) {
      console.log(data.data);
      toast.error(data.message || "Có lỗi xảy ra", {
        id: "permission-error",
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.error(error?.message || "Có lỗi xảy ra", {
        id: "permission-error",
      });
    }
  }, [isError, error]);


  const [editPermissionId, setEditPermissionId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const columns = permissionColumns({
  onEdit: (id) => {
    setEditPermissionId(id);
    setOpenEditDialog(true);
  },
  onDelete: (id) => {
    alert(`Deleting permission with ID: ${id}`);
  },
 
});
  return (
  <>
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Nhóm quyền
        </h1>

        <div className="mt-2"></div>
      </div>

       <PermissionFilter
        setSearchParams={setSearchParams}
       
        refetch={refetch}
        isFetching={isFetching}
        defaultFilters={defaultFilters}
      /> 

      <div
        className="
          overflow-hidden rounded-3xl bg-white
          shadow-[0_16px_40px_rgba(15,23,42,0.06)]
        "
      >
        <div className="flex justify-start gap-2 p-4">
           <AddPermissionDialog />

             <Button type="button" variant="success" onClick={() => refetch()} className="cursor-pointer" title="Làm mới">
            <RotateCw className="h-4 w-4" />
           </Button>
        </div>
        <AppTable
          data={permissions}
          columns={columns}
          isloading={isLoading}
        />
       
      </div>
    </div>

    {editPermissionId !== null && (
      <EditPermissionDialog
        id={editPermissionId}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
    )}
  </>
  );
}
