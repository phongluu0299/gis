

import { BASE_MAPS } from "../config/map.config";

export default function BaseMap({ baseMap, setBaseMap }: { baseMap: typeof BASE_MAPS.satellite; setBaseMap: (map: typeof BASE_MAPS.satellite) => void; }) {
  return (
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
  );
}