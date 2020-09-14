import React, { useCallback, useRef } from 'react';
import Album from './model/Album';

interface AlbumDetailsProps {
  album: Album;
  initialImgRect?: { top: number; left: number; width: number; height: number };
}

const defaultImgRect = {
  top: 0,
  left: 0,
  width: 200,
  height: 200,
};

function AlbumDetails({ album, initialImgRect = defaultImgRect }: AlbumDetailsProps) {
  const containerRef = useRef<HTMLElement>(null);

  const setInitialImagePosition = useCallback(
    (el: HTMLImageElement) => {
      if (el) {
        const targetRect = el.getBoundingClientRect();

        el.style.top = `${initialImgRect.top}px`;
        el.style.left = `${initialImgRect.left}px`;
        el.style.width = `${initialImgRect.width}px`;
        el.style.height = `${initialImgRect.height}px`;

        const scaleX = targetRect.width / initialImgRect.width;
        const translateX = targetRect.left - initialImgRect.left + ((targetRect.width - initialImgRect.width) * 0.5);
        const scaleY = targetRect.height / initialImgRect.height;
        const translateY = targetRect.top - initialImgRect.top + ((targetRect.height - initialImgRect.height) * 0.5);

        setTimeout(() => {
          el.style.transitionDuration = '500ms';
          el.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scaleX}, ${scaleY})`;
        });
      }
    },
    [initialImgRect]
  );

  return (
    <section ref={containerRef} className="album__album-details">
      <img ref={setInitialImagePosition} src={album.thumb} alt={album.name} />
    </section>
  );
}

export default AlbumDetails;
