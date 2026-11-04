import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";

export const MAP_CONFIG = {
  center: [10.027254, 105.769806] as LatLngTuple,
  zoom: 10,
  minZoom: 10,
  maxZoom: 18,
  maxBoundsViscosity: 1,
};

// Ví dụ vùng giới hạn; chỉnh theo phạm vi bạn muốn cho kéo.
export const MAP_BOUNDS: LatLngBoundsExpression = [
  [9.0, 104.7],
  [11.1, 106.85],
];

export const BASE_MAPS = {
  osm: {
    name: "Đường phố",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  },

  opentopo: {
    name: "Địa hình",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "© OpenTopoMap",
    maxZoom: 17,
  },
  satellite: {
    name: "Vệ tinh",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri",
    maxZoom: 18,
  },
  voyager: {
  name: "Đường phố đẹp",
  url: "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_51tq_1_0f360c9bafad736b5e9e5726",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 20,
},
//   dark: {
//     name: "Vùng tối",
//     url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
//     attribution: "&copy; Carto",
//     maxZoom: 19,
//   },
  
};
