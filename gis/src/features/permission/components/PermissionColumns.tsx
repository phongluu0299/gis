import { Button } from "@/components/ui/button";
import type { ListPermission } from "../types/permission.types";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

type PermissionColumnActions = {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
export const permissionColumns = ({
  onEdit,
  onDelete,
}: PermissionColumnActions): ColumnDef<ListPermission>[] => [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
    meta: {
      width: "5%",
    },
  },
  {
    accessorKey: "permissionName",
    header: "Tên quyền",
    meta: {
      width: "40%",
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    meta: {
      width: "45%",
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    meta: { width: "10%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="success"
          size="xs"
          title="Sửa quyền"
          aria-label={`Sửa quyền ${row.original.permissionName}`}
          onClick={() => onEdit(row.original.permissionID)}
         
        >
          <SquarePen className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="danger"
          size="xs"
          title="Xóa quyền"
          aria-label={`Xóa quyền ${row.original.permissionName}`}
          onClick={() => onDelete(row.original.permissionID)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
