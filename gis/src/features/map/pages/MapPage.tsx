import { GeoJSON, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { BASE_MAPS, MAP_BOUNDS, MAP_CONFIG } from "../config/map.config";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mapService } from "../services/map.service";
import type { RanhGioi } from "../types/map.types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
export default function MapPage() {
  const [baseMap, setBaseMap] = useState(BASE_MAPS.satellite);

 const { data } = useQuery({
    queryKey: ["ranhgioi", "getAll"],
    queryFn: () => mapService.getAll(),
    staleTime: 60 * 60 * 1000,
  });


const [selectedRanhGioi, setSelectedRanhGioi] =
  useState<RanhGioi | null>(null);
const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  return (
    <div className="h-[calc(100vh-100px)] w-full relative">
      <MapContainer
        {...MAP_CONFIG}
        maxBounds={MAP_BOUNDS}
        className="h-full w-full"
      >
        <TileLayer
          url={baseMap.url}
          attribution={baseMap.attribution}
          maxZoom={baseMap.maxZoom}
        />

{data?.data.map((ranhGioi) => (
    <GeoJSON
      key={ranhGioi.ranhGioiID}
      data={ranhGioi.geometry}
      style={{
        color: "#e5e6df",
        weight: 1,
      
      }}
       eventHandlers={{
            click: () => {
              setSelectedRanhGioi(ranhGioi);
              setIsInfoOpen(true);
            },
          }}
    >
      {/* <Tooltip sticky>
        <div>
          <strong>{ranhGioi.tenXa || ranhGioi.tenTinh}</strong>
          <div>Diện tích: {ranhGioi.dienTichKm2} km²</div>
          <div>Dân số: {ranhGioi.danSo.toLocaleString("vi-VN")}</div>
        </div>
      </Tooltip> */}
    </GeoJSON>
  ))}


      </MapContainer>
      <div className="absolute top-2 right-2 bg-white p-2 rounded">
        <select
          value={baseMap.name}
          onChange={(e) => {
            const selectedMap = Object.values(BASE_MAPS).find(
              (map) => map.name === e.target.value
            );
            if (selectedMap) setBaseMap(selectedMap);
          }}
        >
          {Object.values(BASE_MAPS).map((map) => (
            <option key={map.name} value={map.name}>
              {map.name}
            </option>
          ))}
        </select>
      </div>

       {/* Thông tin vùng được chọn */}
    {isInfoOpen && selectedRanhGioi && (
      <Card className="absolute bg-amber-50 bottom-4 right-4 z-[1000] flex h-[50vh] max-h-[calc(100%-5rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden py-0 shadow-xl md:w-[25vw] xl:w-[20vw]">
        <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-2 border-b p-4">
          <CardTitle className="min-w-0 text-base">
            {selectedRanhGioi.tenXa || selectedRanhGioi.tenTinh}
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
      </Card>
    )}
    </div>
  );
}
