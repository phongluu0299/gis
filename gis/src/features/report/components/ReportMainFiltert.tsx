import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ReportRequest } from "../types/reporttype";
import { toast } from "sonner";
import AppSelect from "@/components/comon/AppSelect/AppSelect";
import type { Option } from "@/types/basetype";
import { useAppOptions, useServiceOptions, useUnitOptions } from "@/hooks/comboboxHook";
import { Download, Filter, Search } from "lucide-react";
import ReportFilter from "./ReportFilter";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";



type ReportMainFilterProps = {
  setSearchParams: (params: ReportRequest) => void;
  searchParams: ReportRequest;
  refetch: () => void;
  isFetching: boolean;
  isExporting: boolean;
  defaultFilters: ReportRequest;
  exportReport: (params: ReportRequest) => void;
};
const ReportMainFiltert = ({setSearchParams, searchParams, refetch, isFetching, isExporting, exportReport, defaultFilters}: ReportMainFilterProps) => {

  const { register, control, handleSubmit } = useForm<ReportRequest>({
    defaultValues: defaultFilters,
  });

  
  const [timeRange, setTimeRange] = useState("date");


  const timeRangeOptions: Option[] = [
    {
      label: "Ngày",
      value: "date",
    },
    {
      label: "Tháng",
      value: "month",
    },
    {
      label: "Quý",
      value: "quarter",
    },
    {
      label: "Năm",
      value: "year",
    },
  ];

    const envOptions: Option[] = [
      {
        label: "Tất cả ",
        value: "-1",
      },
      {
        label: "Production",
        value: "production",
      },
      {
        label: "Sandbox",
        value: "sandbox",
      },
    ];
  const { data: unitOptions = [] } = useUnitOptions();
  const { data: appOptions = [] } = useAppOptions();
  const { data: serviceOptions = [] } = useServiceOptions();
  const onSearch = (values: ReportRequest) => {
    const fail = (message: string) => {
      toast.error(message, { id: "report-validation" });
    };

    const validNumber = (value: number, min: number, max: number) =>
      Number.isInteger(value) && value >= min && value <= max;

    const params: ReportRequest = {
      ...values,
      fromDate: "-1",
      toDate: "-1",
      fromMonth: defaultFilters.fromMonth,
      toMonth: defaultFilters.toMonth,
      fromQuarter: defaultFilters.fromQuarter,
      toQuarter: defaultFilters.toQuarter,
      year: defaultFilters.year,
    };

    switch (timeRange) {
      case "date": {
        if (
          values.fromDate == undefined ||
          values.toDate == undefined ||
          !values.fromDate ||
          !values.toDate
        ) {
          fail("Vui lòng chọn đầy đủ từ ngày và đến ngày");
          return;
        }

        if (values.fromDate > values.toDate) {
          fail("Từ ngày không được lớn hơn đến ngày");
          return;
        }
        params.fromDate = values.fromDate;
        params.toDate = values.toDate;
        break;
      }

      case "month": {
        if (values.year == undefined || !validNumber(values.year, 2000, 9999)) {
          fail("Vui lòng chọn năm");
          return;
        }
        if (
          values.fromMonth == undefined ||
          values.toMonth == undefined ||
          !validNumber(values.fromMonth, 1, 12) ||
          !validNumber(values.toMonth, 1, 12)
        ) {
          fail("Vui lòng chọn đầy đủ từ tháng và đến tháng");
          return;
        }
        if (values.fromMonth > values.toMonth) {
          fail("Từ tháng không được lớn hơn đến tháng");
          return;
        }

        params.fromMonth = values.fromMonth;
        params.toMonth = values.toMonth;
        params.year = values.year;
        break;
      }

      case "quarter": {
        if (values.year == undefined || !validNumber(values.year, 2000, 9999)) {
          fail("Vui lòng chọn năm");
          return;
        }
        if (
          values.fromQuarter == undefined ||
          values.toQuarter == undefined ||
          !validNumber(values.fromQuarter, 1, 4) ||
          !validNumber(values.toQuarter, 1, 4)
        ) {
          fail("Vui lòng chọn đầy đủ từ quý và đến quý");
          return;
        }

        if (values.fromQuarter > values.toQuarter) {
          fail("Từ quý không được lớn hơn đến quý");
          return;
        }

        params.fromQuarter = values.fromQuarter;
        params.toQuarter = values.toQuarter;
        params.year = values.year;
        break;
      }

      case "year":
        if (values.year == undefined || !validNumber(values.year, 2000, 9999)) {
          fail("Vui lòng chọn năm");
          return;
        }
        params.year = values.year;
        break;

      default:
        fail("Vui lòng chọn thời gian thống kê");
        return;
    }

    const unchanged = (Object.keys(params) as (keyof ReportRequest)[]).every(
      (key) => params[key] === searchParams[key],
    );

    if (unchanged) {
      void refetch();
    } else {
      setSearchParams(params);
    }
  };
  return (
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

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-2">
          <div className="min-w-0 space-y-2">
            <label
              htmlFor="environment"
              className="block text-sm font-medium text-slate-700"
            >
              Môi trường
            </label>

            <Controller
              name="environment"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="environment"
                  placeholder="Chọn môi trường"
                  options={envOptions}
                  value={field.value == null ? undefined : String(field.value)}
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          <div className="min-w-0 space-y-2">
            <label
              htmlFor="unitId"
              className="block text-sm font-medium text-slate-700"
            >
              Đơn vị
            </label>

            <Controller
              name="unitId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="unitId"
                  placeholder="Chọn đơn vị"
                  options={unitOptions}
                  value={field.value == null ? undefined : String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )}
            />
          </div>

          <div className="min-w-0 space-y-2">
            <label
              htmlFor="appId"
              className="block text-sm font-medium text-slate-700"
            >
              Ứng dụng
            </label>

            <Controller
              name="appId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="appId"
                  placeholder="Chọn ứng dụng"
                  options={appOptions}
                  value={field.value == null ? undefined : String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )}
            />
          </div>

          <div className="min-w-0 space-y-2">
            <label
              htmlFor="serviceId"
              className="block text-sm font-medium text-slate-700"
            >
              Dịch vụ
            </label>

            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="serviceId"
                  placeholder="Chọn dịch vụ"
                  options={serviceOptions}
                  value={field.value == null ? undefined : String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4  mb-2">
          <div className="min-w-0 space-y-2">
            <label
              htmlFor="timeRange"
              className="block text-sm font-medium text-slate-700"
            >
              Thời gian thống kê
            </label>

            <AppSelect
              id="timeRange"
              placeholder="Chọn thời gian thống kê"
              options={timeRangeOptions}
              value={timeRange}
              onValueChange={setTimeRange}
            />
          </div>

          <ReportFilter
            control={control}
            register={register}
            timeRange={timeRange}
          />
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
            {isFetching && <Spinner className="h-4 w-4" />} Thống kê
          </button>

          <Button
            type="button"
            disabled={isExporting}
            variant={"success"}
            className="
                flex h-10 items-center gap-2 rounded-xl
                 bg-(--color-success) px-4 text-[13px]
        font-medium text-white transition
        hover:opacity-90
        cursor-pointer
              "
                  onClick={() => exportReport(searchParams)}
          >
        
            <Download className="h-4 w-4" /> Tải xuống
          </Button>
        </div>
      </form>

  );
};

export default ReportMainFiltert;