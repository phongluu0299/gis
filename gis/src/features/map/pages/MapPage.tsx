import { MapContainer, TileLayer } from "react-leaflet";
import { BASE_MAPS, MAP_BOUNDS, MAP_CONFIG } from "../config/map.config";
import { useState } from "react";
import MapLayers from "../components/layers/MapLayers";


export default function MapPage() {
  const [baseMap, setBaseMap] = useState(BASE_MAPS.satellite);

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
        <MapLayers baseMap={baseMap} setBaseMap={setBaseMap} />
      </MapContainer>
  
    </div>
  );
}
