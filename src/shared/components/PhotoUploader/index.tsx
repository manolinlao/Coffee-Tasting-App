import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { PhotoType, TempPhoto } from '../../../api/photo/types';
import { PHOTO_TYPE_LABELS } from '../../../api/photo/constants';

const PHOTO_TYPES: { label: string; value: PhotoType }[] = [
  { label: PHOTO_TYPE_LABELS.coffee, value: 'coffee' },
  { label: PHOTO_TYPE_LABELS.beans, value: 'beans' },
  { label: PHOTO_TYPE_LABELS.shop, value: 'shop' },
  { label: PHOTO_TYPE_LABELS.method, value: 'method' },
  { label: PHOTO_TYPE_LABELS.qr, value: 'qr' },
  { label: PHOTO_TYPE_LABELS.other, value: 'other' }
];

interface Props {
  onChange: (photos: TempPhoto[]) => void;
}

export const PhotoUploader = ({ onChange }: Props) => {
  const [photos, setPhotos] = useState<TempPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: TempPhoto[] = Array.from(files).map((file) => {
      const blob = file;
      return {
        id: uuidv4(),
        blob,
        type: 'other',
        previewUrl: URL.createObjectURL(blob)
      };
    });

    const updated = [...photos, ...newPhotos];
    setPhotos(updated);
    onChange(updated);
  };

  const updateType = (id: string, newType: PhotoType) => {
    const updated = photos.map((p) =>
      p.id === id ? { ...p, type: newType } : p
    );
    setPhotos(updated);
    onChange(updated);
  };

  const removePhoto = (id: string) => {
    setPhotos((prevPhotos) => {
      const photoToRemove = prevPhotos.find((p) => p.id === id);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }
      const updated = prevPhotos.filter((p) => p.id !== id);
      onChange(updated);
      return updated;
    });
  };

  // Limpiar todos los previewUrls cuando el componente se desmonte
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [photos]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => fileInputRef.current?.click()}
      >
        Subir fotos
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFiles}
      />

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-lg border border-base-300 p-2 shadow"
            >
              <img
                src={photo.previewUrl}
                alt="preview"
                className="w-full h-32 object-cover rounded"
              />
              <div className="mt-2">
                <select
                  className="select select-sm select-bordered w-full"
                  value={photo.type}
                  onChange={(e) =>
                    updateType(photo.id, e.target.value as PhotoType)
                  }
                >
                  {PHOTO_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => removePhoto(photo.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
