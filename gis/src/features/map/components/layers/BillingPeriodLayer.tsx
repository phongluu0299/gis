import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, BillingPeriod } from "../../types/map.types";
import L from "leaflet";
import { toast } from "sonner";
type BillingPeriodLayerProps = {
  setInfoData: (infoData: Info[] | null) => void;
  mapBounds: L.LatLngBounds;
  period: string;
};

const iconMarker = L.icon({
  iconUrl: "/iconmap/record-payment.png",
  iconSize: [21, 21],
  iconAnchor: [10, 21], // Giữa đáy ảnh nằm đúng tọa độ
});

const toInfo = (BillingPeriod: BillingPeriod | null): Info[] => {
  const info: Info[] = [];

  info.push(
   {
    title: "Tên khách hàng",
    description: `${BillingPeriod?.hoTenKH || ""}`,
  },
  {
    title: "Mã danh bộ",
    description: `${BillingPeriod?.maDB || ""}`,
  },
  {
    title: "Chỉ số cũ",
    description: `${BillingPeriod?.chiSoCu?.toLocaleString("vi-VN") || ""}`,
  },
  {
    title: "Chỉ số mới",
    description: `${BillingPeriod?.chiSoMoi?.toLocaleString("vi-VN") || ""}`,
  },
  {
    title: "Lượng tiêu thụ",
    description: `${BillingPeriod?.luongTieuThu?.toLocaleString("vi-VN") || ""}`,
  },
  {
    title: "Thành tiền",
    description: `${BillingPeriod?.thanhTien?.toLocaleString("vi-VN") || ""} VND`,
  },
  {
    title: "Mã nhân viên",
    description: `${BillingPeriod?.maNV || ""}`,
  },
  {
    title: "Tên nhân viên",
    description: `${BillingPeriod?.tenNV || ""}`,
  },
  {
    title: "Ngày ghi",
    description: `${BillingPeriod?.ngayGhi || ""}`,
  }

);

  return info;
};
export default function BillingPeriodLayer({
  setInfoData,
  mapBounds,
  period,
}: BillingPeriodLayerProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["BillingPeriod", "getBillingPeriodByBound", mapBounds, period],
    queryFn: () => mapService.getBillingPeriodByBound(mapBounds, period),
    staleTime: 5 * 60 * 1000,
  });

const handleClick = async (id: number) => {
  try {
    console.log("Fetching water meter details for id:", id);
    const response = await queryClient.fetchQuery({
      queryKey: ["BillingPeriod", "detail", id],
      queryFn: () => mapService.getBillingPeriodById(id),
      staleTime: 5 * 60 * 1000,
    });

    setInfoData(toInfo(response.data));
  } catch (error) {
    toast.error("Không xem được chi tiết kỳ ghi thu");
    console.error(error);
  }
};
  return (
    <>
      {data?.data.map((BillingPeriod) => (
        <GeoJSON
          key={BillingPeriod.id}
          data={BillingPeriod.location}
          pointToLayer={(_, latlng) => L.marker(latlng, { icon: iconMarker })}
          eventHandlers={{
            click: () => {
              void handleClick(BillingPeriod.id);
            },
          }}
        />
      ))}
    </>
  );
}
