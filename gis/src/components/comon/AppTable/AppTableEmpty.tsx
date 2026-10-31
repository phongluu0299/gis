import { Inbox } from "lucide-react";

export default function AppTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Inbox className="h-8 w-8 text-slate-400" />
      </div>

      <div className="mt-4 text-lg font-semibold text-slate-900">
       Không có dữ liệu
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Không có dữ liệu để hiển thị
      </div>
    </div>
  );
}