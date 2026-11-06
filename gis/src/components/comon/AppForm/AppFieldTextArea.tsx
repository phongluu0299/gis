import { useId, type ComponentProps, type ReactNode } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type AppFieldTextAreaProps = ComponentProps<typeof Textarea> & {
  label: ReactNode;
  error?: { message?: string };
  fieldClassName?: string;
};

export function AppFieldTextArea({
  label,
  error,
  fieldClassName,
  id,
  required,
  className,
  "aria-describedby": describedBy,
  ...inputProps
}: AppFieldTextAreaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const descriptionIds =
    [describedBy, error?.message ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <Field className={fieldClassName} data-invalid={!!error}>
      <FieldLabel htmlFor={inputId}>
        {label}
        {required && (
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </FieldLabel>

      <Textarea
        id={inputId}
        className={cn("app-textarea-default", className)}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        aria-describedby={descriptionIds}
        {...inputProps}
      />

      <FieldError id={errorId} errors={[error]} />
    </Field>
  );
}
