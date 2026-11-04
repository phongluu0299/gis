
import {
  InputGroup,
  InputGroupAddon,

  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

type MapMonthSearchProps = {
  
  period: string;
  setPeriod: (period: string) => void;
};

export default function MapMonthSearch({  period, setPeriod }: MapMonthSearchProps) {

  return (
    <div
      className="absolute right-3 top-3 z-1000 w-84 max-w-[calc(100%-8rem)]"
      aria-label="Tìm kiếm theo tháng năm"

    >
      <InputGroup className="h-10 bg-white shadow-lg">
   <InputGroupAddon>
          <InputGroupText>Kỳ ghi thu:</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
         type="month"
          aria-label="Tháng/năm"
          placeholder="mm/yyyy"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          required
          className="app-input-field"
        />
      
      </InputGroup>

    
    </div>
  );
}
