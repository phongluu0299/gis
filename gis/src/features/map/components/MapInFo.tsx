import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

export default function MapInFo() {
  return;
  <Card className="absolute bg-amber-50 bottom-4 right-4 z-[1000] flex h-[50vh] max-h-[calc(100%-5rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden py-0 shadow-xl md:w-[25vw] xl:w-[20vw]">
    <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-2 border-b p-4">
      <CardTitle className="min-w-0 text-base">
        Thông tin chi tiết
      </CardTitle>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="size-8 shrink-0"
        aria-label="Đóng thông tin"
        onClick={() => setIsInfoOpen(false)}
      >
        <X className="size-4" />
      </Button>
    </CardHeader>

    <CardContent className="min-h-0 flex-1 overflow-y-auto p-4">
      <dl className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">Diện tích</dt>
          <dd className="text-right font-medium">
            {selectedRanhGioi.dienTichKm2?.toLocaleString("vi-VN") ?? "—"} km²
          </dd>
        </div>

        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">Dân số</dt>
          <dd className="text-right font-medium">
            {selectedRanhGioi.danSo?.toLocaleString("vi-VN") ?? "—"} người
          </dd>
        </div>
      </dl>
    </CardContent>
  </Card>;
}
