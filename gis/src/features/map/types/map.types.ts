import type { MultiPolygon } from "geojson";

export type RanhGioi = {
  ranhGioiID: number;
  maXa: string;
  tenXa: string;
  sapNhap: string | null;
  truSo: string | null;
  loai: string | null;
  cap: number;
  stt: number;
  dienTichKm2: number;
  danSo: number;
  matDoKm2: number;
  maTinh: string;
  tenTinh: string;
  geometry: MultiPolygon;
};

export type Info = {
    title: string;
    description: string;
}