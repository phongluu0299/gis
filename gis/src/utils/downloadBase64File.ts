import type { ExportFileResponse } from "@/types/basetype";


export function downloadBase64File(file: ExportFileResponse): void {
  const binary = atob(file.base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: file.contentType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = file.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();


  setTimeout(() => URL.revokeObjectURL(url), 1000);
}