import { useEffect, useMemo, useState } from 'react';
import type { PhotoEntry } from '../../../api/photo/types';

interface Props {
  photos: PhotoEntry[];
  heightClass?: string;
}

export function PhotoCarousel({ photos, heightClass = 'h-64' }: Props) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const urls = useMemo(() => {
    return photos.map((p) => ({
      id: p.id,
      url: URL.createObjectURL(p.blob)
    }));
  }, [photos]);

  useEffect(() => {
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u.url));
    };
  }, [urls]);

  useEffect(() => {
    if (index > photos.length - 1) setIndex(0);
  }, [photos.length, index]);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  if (photos.length === 0) return null;

  return (
    <div className="mt-2">
      {/* Móvil: scroll horizontal */}
      <div className="sm:hidden">
        <div className="flex overflow-x-auto gap-2 snap-x snap-mandatory">
          {urls.map((u, i) => (
            <img
              key={u.id}
              src={u.url}
              alt={`Foto ${u.id}`}
              className="w-40 h-40 object-cover rounded snap-start shrink-0 cursor-pointer"
              onClick={() => {
                setIndex(i);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: slideshow */}
      <div className="hidden sm:block">
        <div className={`relative w-full ${heightClass}`}>
          <img
            src={urls[index].url}
            alt={`Foto ${urls[index].id}`}
            className={`w-full ${heightClass} object-cover rounded cursor-pointer`}
            onClick={() => setModalOpen(true)}
          />

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2"
              >
                ❮
              </button>
              <button
                type="button"
                onClick={next}
                className="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2"
              >
                ❯
              </button>

              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {urls.map((u, i) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`btn btn-xs ${i === index ? 'btn-primary' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal tipo lightbox */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          {/* Imagen central */}
          <img
            src={urls[index].url}
            alt={`Foto ${urls[index].id}`}
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // no cerrar al click sobre la imagen
          />

          {/* Flechas dentro del modal */}
          {photos.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                ❮
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                ❯
              </button>
            </>
          )}

          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 btn btn-sm btn-circle"
            onClick={() => setModalOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
