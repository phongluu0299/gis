import { Download, Plus, RefreshCw, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

import { userService } from "../services/userservice";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { type ColumnDef } from "@tanstack/react-table";
import type { GetUserDTO, UserFilterDTO } from "../types/usertype";
import { AppTable } from "@/components/comon/AppTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
export default function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["user", "get"],
    queryFn: userService.get,
  });

  const users = Array.isArray(data) ? data : [];

  const columns = useMemo<ColumnDef<GetUserDTO>[]>(
    () => [
      {
        header: "#",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "userName",
        header: "Username",
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
      },
      {
        accessorKey: "phone",
        header: "Email",
      },
      {
        accessorKey: "active",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.active ? "Admin" : "User";

          return (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {role}
            </span>
          );
        },
      },
    ],
    []
  );

  const { register, control, handleSubmit } = useForm<UserFilterDTO>({
    defaultValues: {
      username: "",
      email: "",
      role: "",
    },
  });
  
  const onSearch = (values: UserFilterDTO) => {
    console.log(values);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Users</h1>

        <div className="mt-2"></div>
      </div>

      <form
  onSubmit={handleSubmit(onSearch)}
  className="
    rounded-3xl bg-white p-6
    shadow-[0_16px_40px_rgba(15,23,42,0.06)]
  "
>
  <div className="mb-6 flex items-center gap-2">
    <div
      className="
        flex h-9 w-9 items-center justify-center
        rounded-xl bg-indigo-50 text-(--color-primary)
      "
    >
      <Filter className="h-4 w-4" />
    </div>

    <div className="font-semibold text-slate-900">Filters</div>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <input
      type="text"
      placeholder="Username"
      {...register("username")}
      className="
        h-9 rounded-xl border border-slate-200
        bg-white px-3 text-[13px] outline-none
        transition placeholder:text-slate-400
        focus:border-(--color-primary)
        focus:ring-4 focus:ring-indigo-50
      "
    />

    <input
      type="text"
      placeholder="Email"
      {...register("email")}
      className="
        h-9 rounded-xl border border-slate-200
        bg-white px-3 text-[13px] outline-none
        transition placeholder:text-slate-400
        focus:border-(--color-primary)
        focus:ring-4 focus:ring-indigo-50
      "
    />

    <Controller
      name="role"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger
            className="
              rounded-xl border-slate-200
              bg-white text-[13px] shadow-none
            "
          >
            <SelectValue placeholder="-- Chọn --" />
          </SelectTrigger>

          <SelectContent
            className="
              rounded-2xl border-0
              shadow-[0_16px_40px_rgba(15,23,42,0.12)]
            "
          >
            {[
              "Admin aakasdfj ạ asnmcfl gj apsfm asdfgi japsfm",
              "Manager",
              "User",
            ].map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  </div>

  <div className="mt-5 flex justify-end">
    <button
      type="submit"
      className="
        flex h-10 items-center gap-2 rounded-xl
        bg-(--color-primary) px-4 text-[13px]
        font-medium text-white transition
        hover:opacity-90
      "
    >
      <Search className="h-4 w-4" />
      Search
    </button>
  </div>
</form>

      <div
        className="
          overflow-hidden rounded-3xl bg-white
          shadow-[0_16px_40px_rgba(15,23,42,0.06)]
        "
      >
        <div
          className="
            flex items-center justify-between
            border-b border-slate-100 p-5
          "
        >
          <div className="flex items-center gap-3">
            <Button
              variant={"primary"}
              className="
                flex h-9 items-center gap-2 rounded-xl
               px-3 text-[13px]
                font-medium transition
                
              "
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button
              variant={"success"}
              className="
                flex h-9 items-center gap-2 rounded-xl
                 px-3
                text-[13px] font-medium 
                transition 
              "
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button
              variant={"secondary"}
              className="
                flex h-9 items-center gap-2 rounded-xl
                 px-3
                text-[13px] font-medium 
                transition 
              "
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <AppTable data={users} columns={columns} isloading={isLoading} />
      </div>
    </div>
  );
}
