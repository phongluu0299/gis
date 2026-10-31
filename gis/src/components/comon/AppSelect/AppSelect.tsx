import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Option } from "../../../types/basetype";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type AppSelectProps = {
  id?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export default function AppSelect({
  id,
  options,
  value,
  onValueChange,
  placeholder = "Chọn...",
}: AppSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (option) => String(option.value) === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
           id={id}
  type="button"
  variant="outline"
  role="combobox"
  aria-expanded={open}
  className="
    h-10 w-full min-w-0 justify-between
    rounded-xl border border-slate-200
    bg-white px-3 text-[13px] font-normal
    text-slate-700 shadow-none
    hover:border-slate-300 hover:bg-slate-50
    focus-visible:border-blue-400
    focus-visible:ring-2 focus-visible:ring-blue-100
    focus-visible:ring-offset-0
  "
        >
          <span
            className={`truncate ${
              selectedOption ? "text-slate-700" : "text-muted-foreground"
            }`}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="
       z-[1000]
    w-[var(--radix-popover-trigger-width)]
    overflow-hidden rounded-xl
    border border-slate-200 bg-white p-0
    text-slate-700
    shadow-[0_8px_30px_rgba(15,23,42,0.12)]
        "
      >
        <Command  className="
      rounded-xl bg-white text-slate-700
      [&_[cmdk-input-wrapper]]:border-slate-100
    ">
          <CommandInput placeholder="Tìm kiếm..." className="
        h-10 border-0 bg-transparent text-[13px]
        outline-none ring-0 shadow-none
        focus:ring-0 focus-visible:ring-0
      " />

          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={String(option.value)}
                  keywords={[option.label]}
                  onSelect={() => {
                    onValueChange?.(String(option.value));
                    setOpen(false);
                  }}
               className="
  mx-1 my-0.5 cursor-pointer rounded-lg
  px-3 py-2 text-[13px]
  data-[selected=true]:bg-blue-50
  data-[selected=true]:text-blue-700
"
                >
                  <span className="min-w-0 flex-1 wrap-break-word">
                    {option.label}
                  </span>

                  <Check
                    className={`ml-2 size-4 shrink-0 ${
                      value === String(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}