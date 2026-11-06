import { useId, type ComponentProps, type ReactNode } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AppFieldTextProps = ComponentProps<typeof Input> & {
  label: ReactNode;
  error?: { message?: string };
  fieldClassName?: string;
};

export function AppFieldText({
  label,
  error,
  fieldClassName,
  id,
  required,
  className,
  "aria-describedby": describedBy,
  ...inputProps
}: AppFieldTextProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const descriptionIds = [describedBy, error?.message ? errorId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <Field className={fieldClassName} data-invalid={!!error}>
      <FieldLabel htmlFor={inputId}>
        {label}
        {required && <span className="text-red-600" aria-hidden="true">*</span>}
      </FieldLabel>
      <Input
        type="text"
        {...inputProps}
        id={inputId}
        required={required}
        aria-required={required || inputProps["aria-required"]}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        aria-describedby={descriptionIds}
        className={cn("app-text-input-default", className)}
      />
      <FieldError id={errorId} errors={[error]} />
    </Field>
  );
}
