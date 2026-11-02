import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, WaterMeter } from "../../types/map.types";
import L from "leaflet";
import { toast } from "sonner";
type WaterMeterLayerProps = {
  setInfoData: (infoData: Info[] | null) => void;
  mapBounds: L.LatLngBounds;
};

const stationIcon = L.icon({
  iconUrl: "/iconmap/water-meter.png",
  iconSize: [14, 14],
  iconAnchor: [7, 14], // Giữa đáy ảnh nằm đúng tọa độ
});

const toInfo = (WaterMeter: WaterMeter | null): Info[] => {
  const info: Info[] = [];

  info.push({
    title: "Mã khách hàng",
    description: `${WaterMeter?.maKH || ""}`,
  },
   {
    title: "Tên khách hàng",
    description: `${WaterMeter?.tenKH || ""}`,
  },
  {
    title: "Mã danh bộ",
    description: `${WaterMeter?.maDB || ""}`,
  },
  {
    title: "Địa chỉ",
    description: `${WaterMeter?.diaChi || ""}`,
  },
  {
    title: "Trạng thái đồng hồ",
    description: `${WaterMeter?.trangThaiDongHo || ""}`,
  },
  {
    title: "Ngày sản xuất",
    description: `${WaterMeter?.nsx || ""}`,
  },
  {
    title: "Thời hạn sử dụng",
    description: `${WaterMeter?.thoiHanSuDung || ""}`,
  }

);

  return info;
};
export default function WaterMeterLayer({
  setInfoData,
  mapBounds,
}: WaterMeterLayerProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["WaterMeter", "getWaterMeterByBound", mapBounds],
    queryFn: () => mapService.getWaterMeterByBound(mapBounds),
    staleTime: 5 * 60 * 1000,
  });

const handleClick = async (id: number) => {
  try {
    console.log("Fetching water meter details for id:", id);
    const response = await queryClient.query({
      queryKey: ["WaterMeter", "detail", id],
      queryFn: () => mapService.getWaterMeterById(id),
      staleTime: 5 * 60 * 1000,
    });

    setInfoData(toInfo(response.data));
  } catch (error) {
    toast.error("Không xem được chi tiết đồng hồ khách hàng");
    console.error(error);
  }
};
  return (
    <>
      {data?.data.map((waterMeter) => (
        <GeoJSON
          key={waterMeter.id}
          data={waterMeter.location}
          pointToLayer={(_, latlng) => L.marker(latlng, { icon: stationIcon })}
          eventHandlers={{
            click: () => {
              void handleClick(waterMeter.id);
            },
          }}
        />
      ))}
    </>
  );
}
