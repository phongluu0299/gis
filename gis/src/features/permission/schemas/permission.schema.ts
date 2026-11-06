import { z } from "zod";

export const createPermissionSchema = z.object({
   permissionName: z.string().trim()
     .min(1, "Tên quyền không được để trống")
     .max(150, "Tên quyền không được vượt quá 150 ký tự"),
  description: z.string().trim()
    .max(255, "Mô tả không được vượt quá 255 ký tự")
    .optional(),
});

// export type CreatePermissionFormValues = z.infer<typeof createPermissionSchema>;
