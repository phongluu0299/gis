import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  FieldError } from "@/components/ui/field";
import { AppFieldText } from "@/components/comon/AppForm/AppFieldText";

import { Spinner } from "@/components/ui/spinner";
import { permissionService } from "../services/permission.service";
import { createPermissionSchema } from "../schemas/permission.schema";
import type { CreatePermission } from "../types/permission.types";
import { handleFormError } from "@/lib/handle-form-error";
import { AppFieldTextArea } from "@/components/comon/AppForm/AppFieldTextArea";

const defaultValues: CreatePermission = { permissionName: "", description: "" };
export default function AddPermissionDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreatePermission>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: defaultValues,
  });
  const mutation = useMutation({ mutationFn: permissionService.create });
  const busy = isSubmitting || mutation.isPending;

  const changeOpen = (nextOpen: boolean) => {
    if (busy) return;
    reset();
    mutation.reset();
    setOpen(nextOpen);
  };

  const onSubmit = async (values: CreatePermission) => {
    if (mutation.isPending) return;
    try {
      const result = await mutation.mutateAsync(values);
      toast.success(result.message || "Thêm quyền thành công");
      reset();
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["permission", "get"] });
    } catch (error) {
      handleFormError({
        error,
        fieldNames: createPermissionSchema.keyof().options,
        setError,
        fallbackMessage: "Không thể thêm quyền. Vui lòng thử lại.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="primary"
          className="cursor-pointer"
          title="Thêm quyền"
          aria-label="Thêm quyền"
        >
          <CirclePlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-6 text-slate-900 shadow-2xl ring-slate-200 sm:max-w-lg"
        showCloseButton={!busy}
      >
        <DialogHeader className="gap-2 pr-8">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Thêm quyền
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-500">
            Tạo nhóm quyền mới để quản lý truy cập hệ thống.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6 pt-2"
          aria-busy={busy}
        >
          <fieldset disabled={busy} className="space-y-6">
            <AppFieldText
              label="Tên quyền"
              id="add-permission-name"
              placeholder="Ví dụ: Quản trị hệ thống"
              required
              autoFocus
              autoComplete="off"
              error={errors.permissionName}
              {...register("permissionName")}
            />
            <AppFieldTextArea
              label="Mô tả"
              id="add-permission-description"
              placeholder="Mô tả ngắn về nhóm quyền này"
              error={errors.description}
              rows={4}
              {...register("description")}
            />
            <FieldError errors={[errors.root?.server]} />

            <DialogFooter className="-mx-6 -mb-6 gap-3 rounded-b-2xl border-slate-200 bg-slate-50 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                className="min-w-20"
                size="lg"
                onClick={() => changeOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="min-w-28"
                size="lg"
              >
                {busy && <Spinner className="h-4 w-4" />}
                {busy ? "Đang lưu..." : "Thêm quyền"}
              </Button>
            </DialogFooter>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
