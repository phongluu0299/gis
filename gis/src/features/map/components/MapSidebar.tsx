import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Info,
  Minus,
  Plus,
} from "lucide-react";
import { useMap, useMapEvents } from "react-leaflet";
import { mapService } from "../services/map.service";
import type { Result } from "@/types/basetype";
import type { LegendItem } from "../types/map.types";

type MapSidebarProps = {
  mapZoom: number;
  map: L.Map;
  data: Result<LegendItem[]> | undefined;
  isPending: boolean;
  isError: boolean;
};
export default function MapSidebar({ mapZoom, map, data, isPending, isError }: MapSidebarProps) {

  const visibleItems = (data?.data ?? []).filter(
    (item) => mapZoom >= item.minZoom,
  );

  const buttonClass =
    "flex size-10 shrink-0 cursor-pointer items-center justify-center " +
    "rounded-lg text-gray-700 hover:bg-gray-100";

  return (
    <aside
      className="absolute left-3 top-3 z-1000 rounded-xl bg-white p-1 shadow-lg"
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <details>
        <summary
          aria-label="Chú thích"
          title="Chú thích"
          className={`${buttonClass} list-none [&::-webkit-details-marker]:hidden`}
        >
          <Info size={20} />
        </summary>

        <div className="absolute left-full top-0 ml-2 w-60 rounded-xl bg-white p-4 shadow-lg">
          <h3 className="mb-3 text-sm font-semibold">Chú thích</h3>

          {isPending ? (
            <p className="text-sm text-gray-500">Đang tải chú thích...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">Không tải được chú thích.</p>
          ) : visibleItems.length === 0 ? (
            <p className="text-sm text-gray-500">
              Chưa có chú thích ở mức zoom hiện tại.
            </p>
          ) : (
            <ul className="space-y-3">
              {visibleItems.map((item) => (
                <li key={item.name} className="flex items-center gap-3 text-sm">
                  <img
                     src={`/iconmap/${item.icon}`}
                    alt=""
                    className="size-6 shrink-0 object-contain"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>

      <button
        type="button"
        aria-label="Phóng to"
        title="Phóng to"
        className={buttonClass}
        onClick={() => map.zoomIn()}
      >
        <Plus size={20} />
      </button>

      <button
        type="button"
        aria-label="Thu nhỏ"
        title="Thu nhỏ"
        className={buttonClass}
        onClick={() => map.zoomOut()}
      >
        <Minus size={20} />
      </button>
    </aside>
  );
}
