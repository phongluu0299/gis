import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type AppConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<unknown>;
  title?: string;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  pendingText?: string;
  variant?: "primary" | "danger";
  errorMessage?: string;
};

/** Resolving onConfirm closes the dialog; rejecting keeps it open for retry. */
export function AppConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Xác nhận thao tác",
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  pendingText = "Đang xử lý...",
  variant = "primary",
  errorMessage = "Không thể hoàn tất thao tác. Vui lòng thử lại.",
}: AppConfirmDialogProps) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const submitting = useRef(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const changeOpen = (nextOpen: boolean) => {
    if (submitting.current) return;
    setFailed(false);
    onOpenChange(nextOpen);
  };

  const confirm = async () => {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setFailed(false);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      setFailed(true);
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent
        role="alertdialog"
        aria-busy={busy}
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-6 text-slate-900 shadow-2xl ring-slate-200 sm:max-w-md"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          setFailed(false);
          cancelRef.current?.focus();
        }}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="gap-3">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        {failed && <p role="alert" className="text-sm text-red-600">{errorMessage}</p>}
        <DialogFooter className="-mx-6 -mb-6 mt-2 gap-3 rounded-b-2xl border-slate-200 bg-slate-50 px-6 py-4">
          <Button ref={cancelRef} type="button" variant="outline" size="lg"
            disabled={busy} onClick={() => changeOpen(false)}>
            {cancelText}
          </Button>
          <Button type="button" variant={variant} size="lg" disabled={busy} onClick={confirm}>
            {busy && <Spinner className="h-4 w-4" />}
            {busy ? pendingText : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
