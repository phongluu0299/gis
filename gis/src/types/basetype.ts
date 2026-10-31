export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface Option 
{
    value: string;
    label: string;
}
export interface ExportFileResponse {
  base64: string;
  contentType: string;
  fileName: string;
}