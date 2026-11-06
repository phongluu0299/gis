import { isAxiosError } from "axios";
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

type HandleFormErrorOptions<T extends FieldValues> = {
  error: unknown;
  fieldNames: readonly FieldPath<T>[];
  setError: UseFormSetError<T>;
  fallbackMessage?: string;
};

/** Maps backend validation errors to the supplied form fields, with a toast fallback. */
export function handleFormError<T extends FieldValues>({
  error,
  fieldNames,
  setError,
  fallbackMessage = "Có lỗi xảy ra. Vui lòng thử lại.",
}: HandleFormErrorOptions<T>) {
  if (isAxiosError<{ data?: unknown }>(error) && error.response?.status === 400) {
    const data = error.response.data?.data;
    const validationErrors = Array.isArray(data) ? data : [data];
    const fieldMessages = new Map<FieldPath<T>, string[]>();
    const formMessages: string[] = [];

    for (const item of validationErrors) {
      if (!item || typeof item !== "object") continue;
      const { field, message } = item;
      if (typeof field !== "string" || typeof message !== "string" || !message.trim()) continue;

      const formField = fieldNames.find(key => key.toLowerCase() === field.toLowerCase());
      if (formField) {
        fieldMessages.set(formField, [...(fieldMessages.get(formField) ?? []), message]);
      } else {
        formMessages.push(message);
      }
    }

    for (const [field, messages] of fieldMessages) {
      setError(field, { type: "server", message: [...new Set(messages)].join(" ") });
    }
    if (formMessages.length) {
      setError("root.server", {
        type: "server",
        message: [...new Set(formMessages)].join(" "),
      });
    }
    if (fieldMessages.size || formMessages.length) return;
  }

  const message = isAxiosError<{ message?: unknown }>(error)
    ? error.response?.data?.message
    : error instanceof Error ? error.message : undefined;
  toast.error(typeof message === "string" && message.trim() ? message : fallbackMessage);
}
