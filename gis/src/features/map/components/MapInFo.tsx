import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import type { Info } from "../types/map.types";

type MapInFoProps = {
  infoData: Info[] | null;
  setInfoData: (infoData: Info[] | null) => void;
};

export default function MapInFo({ infoData, setInfoData }: MapInFoProps) {
  return (
  infoData && <Card className="absolute bg-amber-50 bottom-4 right-4 z-1000 flex h-[50vh] max-h-[calc(100%-5rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden py-0 shadow-xl md:w-[25vw] xl:w-[20vw]">
    <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-2 border-b p-4">
      <CardTitle className="min-w-0 text-base">
        Thông tin chi tiết
      </CardTitle>

      <Button
        type="button"
        variant="danger"
        size="sm"
        className="size-8 shrink-0 cursor-pointer"
        aria-label="Đóng thông tin"
        onClick={() => setInfoData(null)}
      >
        <X className="size-16"/>
      
      </Button>
    </CardHeader>

    <CardContent className="min-h-0 flex-1 overflow-y-auto p-4">
      <dl className="space-y-4 text-sm">
        {infoData?.map((item) => 
         (
               <div className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">{item.title}</dt>
            <dd className="text-right font-medium">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
  );
}
