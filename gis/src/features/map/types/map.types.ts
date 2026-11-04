import type { MultiPolygon,Point } from "geojson";

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
export type LegendItem = {
  name: string;
  icon: string; //url to the icon image
  minZoom: number;
  legendID: number;
  type: string;
  color: string;
  sort: number;
};

export type PipeLine = {
  pipelineID: number;
  loai: string;
  geometry: MultiPolygon;
};
export type WaterSupplyStation = {
  waterSupplyStationID: number;
  maHieu: string;
  geometry: Point;
};
export type WaterMeterByBound = {
  id: number;
  location: Point;

};
export type WaterMeter = {
  dongHoKhachHangId: number;
  maKH?: string | null;
  location: Point;
  maDB?: string | null;
  tenKH?: string | null;
  diaChi?: string | null;
  maLT?: string | null;
  trangThaiDongHo?: string | null;
  thoiHanSuDung?: Date | null;
  nsx?: Date | null;
  nguoiCapNhat?: string | null;
  ngayCapNhat?: Date | null;

};

export type BillingPeriodByBound = {
  id: number;
  location: Point;

};

export type BillingPeriod = {
  id: number;

  hoTenKH?: string | null;
  maDB?: string | null;
  chiSoMoi?: number | null;
  chiSoCu?: number | null;
  luongTieuThu?: number | null;
  thanhTien?: number | null;
  trangThaiTT: Point;
  maNV?: string | null;
  tenNV?: string | null;
  ngayGhi?: string | null;

};