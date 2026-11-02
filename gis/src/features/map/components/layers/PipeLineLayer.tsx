import { useQuery } from "@tanstack/react-query";
import { mapService } from "../../services/map.service";
import { GeoJSON } from "react-leaflet";
import type { Info, PipeLine } from "../../types/map.types";

type PipeLineLayerProps = {
  setInfoData: (infoData: Info[] | null) => void;
};

const colorPipeLine: Record<string, string> = {
  "D220": "#F44336",
  "D315": "#FFC107",
  "D450": "#2196F3",
  "D400": "#4CAF50"
}
const weightPipeLine: Record<string, number> = {
  "D220": 1,
  "D315": 2,
  "D450": 4,
  "D400": 3
}
const toInfo = (PipeLine: PipeLine | null): Info[] => {
  const info: Info[] = [];

  info.push(
    {
      title: "Loại đường ống",
      description: `${PipeLine?.loai || ""}`,
    }
  );

  return info;
};
export default function PipeLineLayer({ setInfoData }: PipeLineLayerProps) {
  const { data } = useQuery({
    queryKey: ["PipeLine", "getAll"],
    queryFn: () => mapService.getAllPipeLine(),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      {data?.data.map((PipeLine) => (
        <GeoJSON
          key={PipeLine.pipelineID}
          data={PipeLine.geometry}
          style={{
            color: colorPipeLine[PipeLine.loai] || "#000000",
            weight: weightPipeLine[PipeLine.loai] || 1,
          }}
          eventHandlers={{
            click: () => {
              setInfoData(toInfo(PipeLine))
            },
          }}
        ></GeoJSON>
      ))}
    </>
  );
}
