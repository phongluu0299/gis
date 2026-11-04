import { useQuery } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, RanhGioi } from "../../types/map.types";


type RanhGioiLayerProps = {
  setInfoData: (infoData: Info[] | null) => void;
};

const toRanhGioiInfo = (ranhGioi: RanhGioi | null): Info[] => {
  const info: Info[] = [];

  info.push(
    {
      title: "Địa danh",
      description: `${ranhGioi?.loai || ""} ${ranhGioi?.tenXa || ""}`,
    },
    {
      title: "Diện tích",
      description:
        (ranhGioi?.dienTichKm2?.toLocaleString("vi-VN") || "") + " km²",
    },
    // {
    //   title: "Dân số",
    //   description:
    //     (ranhGioi?.danSo?.toLocaleString("vi-VN") || "") + " người",
    // },
    // {
    //   title: "Mật độ (người / km²)",
    //   description: (ranhGioi?.matDoKm2?.toLocaleString("vi-VN") || "") + " người/km²",
    // },
  );

  return info;
};
export default function RanhGioiLayer({ setInfoData }: RanhGioiLayerProps) {
  const { data } = useQuery({
    queryKey: ["ranhgioi", "getAll"],
    queryFn: () => mapService.getAll(),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
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
              setInfoData(toRanhGioiInfo(ranhGioi));
            },
          }}
        ></GeoJSON>
      ))}
    </>
  );
}
