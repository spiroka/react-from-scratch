import React, { useCallback, useEffect, useRef } from 'react';
import Album from './model/Album';
import Image from './Image';
import AlbumDetails from './AlbumDetails';

interface AlbumItemProps {
  album: Album;
  active: boolean;
  onClick: (album: Album) => void;
}

function AlbumItem({ album, onClick, active }: AlbumItemProps) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>();

  const handleClick = useCallback(() => !active && onClick(album), [active, onClick, album]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener('keyup', handleKeyPress);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('keyup', handleKeyPress);
      }
    };
  }, [ref, handleKeyPress]);

  return (
    <article ref={ref} className="album__item" onClick={handleClick} tabIndex={0}>
      <Image className="album__thumb" src={album.thumb} alt={album.name} forwardRef={imgRef} />
      <AlbumDetails
        onClose={() => onClick(album)}
        open={active}
        album={album}
        initialImgRect={imgRef.current?.getBoundingClientRect()}
      />
    </article>
  );
}

export default React.memo(AlbumItem);
