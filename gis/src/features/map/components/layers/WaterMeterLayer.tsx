import { useQuery } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, WaterMeter } from "../../types/map.types";
import L from "leaflet";
type WaterMeterLayerProps = {
  setInfoData: (infoData: Info[] | null) => void;
};

const stationIcon = L.icon({
  iconUrl: "/iconmap/water-meter.png",
  iconSize: [14, 14],
  iconAnchor: [7, 14], // Giữa đáy ảnh nằm đúng tọa độ
});

const toInfo = (WaterMeter: WaterMeter | null): Info[] => {
  const info: Info[] = [];

  info.push(
    {
      title: "Mã khách hàng",
      description: `${WaterMeter?.maKH || ""}`,
    }
  );

  return info;
};
export default function WaterMeterLayer({ setInfoData }: WaterMeterLayerProps) {
  const { data } = useQuery({
    queryKey: ["WaterMeter", "getWaterMeterByBound"],
    queryFn: () => mapService.getWaterMeterByBound("some-bound"),
    staleTime: 1 * 60 * 1000,
  });

  return (
    <>
      {data?.data.map((WaterMeter) => (
       <GeoJSON
  key={WaterMeter.dongHoKhachHangId}
  data={WaterMeter.location}
  pointToLayer={(_, latlng) =>
    L.marker(latlng, { icon: stationIcon })
  }
  eventHandlers={{
    click: () => {
      setInfoData(toInfo(WaterMeter));
    },
  }}
/>
      ))}
    </>
  );
}
