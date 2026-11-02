import { useQuery } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, WaterSupplyStation } from "../../types/map.types";
import L from "leaflet";
type WaterSupplyStationLayerrProps = {
  setInfoData: (infoData: Info[] | null) => void;
};

const stationIcon = L.icon({
  iconUrl: "/iconmap/water-system.png",
  iconSize: [14, 14],
  iconAnchor: [7, 14], // Giữa đáy ảnh nằm đúng tọa độ
});

const toInfo = (WaterSupplyStation: WaterSupplyStation | null): Info[] => {
  const info: Info[] = [];

  info.push(
    {
      title: "Mã hiệu",
      description: `${WaterSupplyStation?.maHieu || ""}`,
    }
  );

  return info;
};
export default function WaterSupplyStationLayer({ setInfoData }: WaterSupplyStationLayerrProps) {
  const { data } = useQuery({
    queryKey: ["WaterSupplyStation", "getAll"],
    queryFn: () => mapService.getAllWaterSupplyStation(),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      {data?.data.map((waterSupplyStation) => (
       <GeoJSON
  key={waterSupplyStation.waterSupplyStationID}
  data={waterSupplyStation.geometry}
  pointToLayer={(_, latlng) =>
    L.marker(latlng, { icon: stationIcon })
  }
  eventHandlers={{
    click: () => {
      setInfoData(toInfo(waterSupplyStation));
    },
  }}
/>
      ))}
    </>
  );
}
