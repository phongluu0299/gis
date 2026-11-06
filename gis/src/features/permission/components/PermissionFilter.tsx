import { ChevronDownIcon, Filter, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ParamListPermission } from "../types/permission.types";
import { Spinner } from "@/components/ui/spinner";

import { Field, FieldLabel } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

type PermissionFilterProps = {
  setSearchParams: (params: ParamListPermission) => void;

  refetch: () => void;
  isFetching: boolean;

  defaultFilters: ParamListPermission;
};

const PermissionFilter = ({
  setSearchParams,

  refetch,
  isFetching,
  defaultFilters,
}: PermissionFilterProps) => {
  const onSearch = (data: ParamListPermission) => {
    setSearchParams(data);
    refetch();
  };
  const { register, handleSubmit } = useForm<ParamListPermission>({
    defaultValues: defaultFilters,
  });
  return (
    <Collapsible
      className=" rounded-3xl bg-white p-2 
    shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          <Filter className="h-4 w-4" /> <b>Lọc dữ liệu</b>
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <form onSubmit={handleSubmit(onSearch)} className="p-4">
          <div className="grid grid-cols-4 gap-2">
            <Field>
              <FieldLabel htmlFor="permissionName">Tên quyền</FieldLabel>
              <input
                type="text"
                placeholder="Tên quyền"
                {...register("permissionName")}
                className="
        h-9 rounded-xl border border-slate-200
        bg-white px-3 text-[13px] outline-none
        transition placeholder:text-slate-400
        focus:border-(--color-primary)
        focus:ring-4 focus:ring-indigo-50 w-full
      "
              />
            </Field>
          </div>

          <div className="mt-5 flex justify-end gap-1">
            <button
              type="submit"
              disabled={isFetching}
              className="
        flex h-10 items-center gap-2 rounded-xl
        bg-(--color-primary) px-4 text-[13px]
        font-medium text-white transition
        hover:opacity-90
        cursor-pointer
      "
            >
              <Search className="h-4 w-4" />
              {isFetching && <Spinner className="h-4 w-4" />} Tìm kiếm
            </button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PermissionFilter;
