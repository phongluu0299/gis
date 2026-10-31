

import AppSelect from "@/components/comon/AppSelect/AppSelect";
import type { ReportRequest } from "../types/reporttype";
import { Controller,  type Control, type UseFormRegister } from "react-hook-form";
import type { Option } from "@/types/basetype";

type ReportTimeFilterProps = {
  control: Control<ReportRequest>;
  timeRange: string;
  register: UseFormRegister<ReportRequest>;
};

const monthOptions: Option[] = Array.from({ length: 12 }, (_, index) => ({
  label: String(index + 1),
  value: String(index + 1),
}));
const quarterOptions: Option[] = [
  { label: "Quý 1", value: "1" },
  { label: "Quý 2", value: "2" },
  { label: "Quý 3", value: "3" },
  { label: "Quý 4", value: "4" },
];
const yearOptions: Option[] = Array.from({ length: 10 }, (_, index) => ({
  label: String(new Date().getFullYear() - index),
  value: String(new Date().getFullYear() - index),
}));

const ReportFilter = ({ control,
  timeRange,
  register
}: ReportTimeFilterProps) => {

  return (
<>
{timeRange == "date" && (<>

<div className="min-w-0 space-y-2">
    <label
      htmlFor="fromDate"
      className="block text-sm font-medium text-slate-700"
    >
      Từ ngày
    </label>

   <input
      type="date"
      placeholder="Từ ngày"
      {...register("fromDate")}
      className="
        h-9 rounded-xl border border-slate-200
        bg-white px-3 text-[13px] outline-none
        transition placeholder:text-slate-400
        focus:border-(--color-primary)
        focus:ring-4 focus:ring-indigo-50 w-full
      "
    />
  </div>

  <div className="min-w-0 space-y-2">
    <label
      htmlFor="toDate"
      className="block text-sm font-medium text-slate-700"
    >
      Đến ngày
    </label>

   <input
      type="date"
      placeholder="Đến ngày"
      {...register("toDate")}
      className="
        h-9 rounded-xl border border-slate-200
        bg-white px-3 text-[13px] outline-none
        transition placeholder:text-slate-400
        focus:border-(--color-primary)
        focus:ring-4 focus:ring-indigo-50 w-full
      "
    />
  </div>

</>)}

{timeRange == "month" && (<>

<div className="min-w-0 space-y-2">
    <label
      htmlFor="fromMonth"
      className="block text-sm font-medium text-slate-700"
    >
      Từ tháng
    </label>

    <Controller
      name="fromMonth"
      control={control}
      render={({ field }) => (
        <AppSelect
          id="fromMonth"
          placeholder="Từ tháng"
          options={monthOptions}
          value={field.value == null ? undefined : String(field.value)}
          onValueChange={(value) => field.onChange(Number(value))}
        />
      )}
    />
  </div>

  <div className="min-w-0 space-y-2">
    <label
      htmlFor="toMonth"
      className="block text-sm font-medium text-slate-700"
    >
      Đến tháng
    </label>

    <Controller
      name="toMonth"
      control={control}
      render={({ field }) => (
        <AppSelect
          id="toMonth"
          placeholder="Đến tháng"
          options={monthOptions}
          value={field.value == null ? undefined : String(field.value)}
          onValueChange={(value) => field.onChange(Number(value))}
        />
      )}
    />
  </div>

</>)}
 {timeRange == "quarter" && (<>
 
  <div className="min-w-0 space-y-2">
    <label
      htmlFor="fromQuarter"
      className="block text-sm font-medium text-slate-700"
    >
      Từ quý
    </label>

    <Controller
      name="fromQuarter"
      control={control}
      render={({ field }) => (
        <AppSelect
          id="fromQuarter"
          placeholder="Từ quý"
          options={quarterOptions}
          value={field.value == null ? undefined : String(field.value)}
          onValueChange={(value) => field.onChange(Number(value))}
        />
      )}
    />
  </div>
  <div className="min-w-0 space-y-2">
    <label
      htmlFor="toQuarter"
      className="block text-sm font-medium text-slate-700"
    >
      Đến quý
    </label>

    <Controller
      name="toQuarter"
      control={control}
      render={({ field }) => (
        <AppSelect
          id="toQuarter"
          placeholder="Đến quý"
          options={quarterOptions}
          value={field.value == null ? undefined : String(field.value)}
          onValueChange={(value) => field.onChange(Number(value))}
        />
      )}
    />
  </div>
 
 </>)  }
 {timeRange != "date" && (

 <div className="min-w-0 space-y-2">
    <label
      htmlFor="year"
      className="block text-sm font-medium text-slate-700"
    >
      Năm
    </label>

    <Controller
      name="year"
      control={control}
      render={({ field }) => (
        <AppSelect
          id="year"
          placeholder="Năm"
          options={yearOptions}
          value={field.value == null ? undefined : String(field.value)}
          onValueChange={(value) => field.onChange(Number(value))}
        />
      )}
    />
  </div>

 )}
  
</>
  );
};

export default ReportFilter;