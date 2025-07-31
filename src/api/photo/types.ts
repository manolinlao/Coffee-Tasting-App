export type PhotoType = 'coffee' | 'beans' | 'shop' | 'method' | 'qr' | 'other';

export interface PhotoEntry {
  id: number;
  tastingId: number; // referencia a TastingEntry
  blob: Blob;
  type: PhotoType;
  createdAt: Date;
}

export interface TempPhoto {
  id: string; // temporal (uuid)
  blob: Blob;
  type: PhotoType;
  previewUrl: string; // generado con URL.createObjectURL(blob)
}
