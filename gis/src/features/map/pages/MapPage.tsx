import { MapContainer, TileLayer } from "react-leaflet";
import MapInFo from "../components/MapInFo";
import { BASE_MAPS, MAP_BOUNDS, MAP_CONFIG } from "../config/map.config";
import { useState } from "react";
import type { Info } from "../types/map.types";

import RanhGioiLayer from "../components/layers/RanhGioiLayer";
import BaseMap from "../components/BaseMap";
import MapSidebar from "../components/MapSidebar";
export default function MapPage() {
  const [baseMap, setBaseMap] = useState(BASE_MAPS.satellite);
  const [infoData, setInfoData] = useState<Info[] | null>(null);

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
        <RanhGioiLayer setInfoData={setInfoData} /> {/* Layer ranh giới */}
        <MapSidebar/>
      </MapContainer>
      <BaseMap setBaseMap={setBaseMap} baseMap={baseMap} /> {/* Bản đồ nền */}
      <MapInFo
        infoData={infoData}
        setInfoData={setInfoData}
      />{/* Thông tin chi tiết */}
    </div>
  );
}
