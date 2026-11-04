

import { BASE_MAPS } from "../config/map.config";

export type BaseMapProps = {
  baseMap: typeof BASE_MAPS.satellite;
  setBaseMap: (map: typeof BASE_MAPS.satellite) => void;
};

export default function BaseMap({ baseMap, setBaseMap }: BaseMapProps) {
  return (
   <div>
         <select
           aria-label="Bản đồ nền"
           className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
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
  );
}
