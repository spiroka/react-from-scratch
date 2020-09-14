import React, { useRef } from 'react';
import Album from './model/Album';
import Image from './Image';
import AlbumDetails from './AlbumDetails';

interface AlbumItemProps {
  album: Album;
  active: boolean;
  onClick: () => void;
}

function AlbumItem({ album, onClick, active }: AlbumItemProps) {
  const imgRef = useRef<HTMLImageElement>();

  return (
    <article className="album__item" onClick={onClick}>
      <Image className="album__thumb" src={album.thumb} alt={album.name} forwardRef={imgRef} />
      {active && (
        <AlbumDetails album={album} initialImgRect={imgRef.current?.getBoundingClientRect()} />
      )}
    </article>
  );
}

export default AlbumItem;
