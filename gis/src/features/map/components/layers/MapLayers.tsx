import { useState } from "react";
import RanhGioiLayer from "./RanhGioiLayer";
import PineLineLayer from "./PipeLineLayer";
import WaterSupplyStationLayer from "./WaterSupplyStationLayer";
import MapSidebar from "../MapSidebar";
import type { BaseMapProps } from "../BaseMap";
import type { Info } from "../../types/map.types";
import MapInFo from "../MapInFo";
import { useMap, useMapEvents } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import WaterMeterLayer from "./WaterMeterLayer";
import MapMonthSearch from "../MapMonthSearch";
import BillingPeriodLayer from "./BillingPeriodLayer";

const ShowLayers= {
    "RanhGioiLayer": 1,
    "WaterMeterLayer": 2,
    "WaterSupplyStationLayer": 3,
    "BillingPeriodLayer": 4,
    "PineLineLayer": 5,
}
const now = new Date();
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

const MapLayers = ({ baseMap, setBaseMap }: BaseMapProps) => {
  const [infoData, setInfoData] = useState<Info[] | null>(null);
  const map = useMap();
  const [mapZoom, setMapZoom] = useState(() => map.getZoom());
  const [mapBounds, setMapBounds] = useState(() => map.getBounds());

  const [period, setPeriod] = useState(() => { return currentMonth;  }); 
const { data, isPending, isError } = useQuery({
    queryKey: ["map", "legend"],
    queryFn: mapService.getAllLegend,
    staleTime: 60 * 60 * 1000,
  });


  useMapEvents({
    zoomend: () => {
      setMapZoom(map.getZoom());
      setMapBounds(map.getBounds());
    },
    moveend: () => {
      setMapBounds(map.getBounds());
    }
  });
  return (
    <>
      {mapZoom >= (data?.data.find(item => item.legendID === ShowLayers["RanhGioiLayer"])?.minZoom ?? 1)  && <RanhGioiLayer setInfoData={setInfoData} />} {/* Layer ranh giới */}
      {mapZoom >= (data?.data.find(item => item.legendID === ShowLayers["PineLineLayer"])?.minZoom ?? 1) && <PineLineLayer setInfoData={setInfoData} />} {/* Layer đường ống */}
      {mapZoom >= (data?.data.find(item => item.legendID === ShowLayers["WaterSupplyStationLayer"])?.minZoom ?? 1) && <WaterSupplyStationLayer setInfoData={setInfoData} />}    {/* Layer trạm cấp nước */}
      {mapZoom >= (data?.data.find(item => item.legendID === ShowLayers["WaterMeterLayer"])?.minZoom ?? 18) && <WaterMeterLayer mapBounds={mapBounds} setInfoData={setInfoData} />}    {/* Layer đồng hồ nước */}
      {mapZoom >= (data?.data.find(item => item.legendID === ShowLayers["BillingPeriodLayer"])?.minZoom ?? 1) && <BillingPeriodLayer period={period} mapBounds={mapBounds} setInfoData={setInfoData} />}     
      <MapSidebar mapZoom={mapZoom} map={map} data={data} isPending={isPending} isError={isError} baseMap={baseMap} setBaseMap={setBaseMap} />
      <MapInFo infoData={infoData} setInfoData={setInfoData} /> {/* Thông tin chi tiết */}
      <MapMonthSearch period={period} setPeriod={setPeriod} />
    </>
  );
};

export default MapLayers;
