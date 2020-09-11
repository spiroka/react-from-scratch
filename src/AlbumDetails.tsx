import React from 'react';
import Album from './model/Album';
import Image from "./Image";

function AlbumDetails({ album }: { album: Album }) {
  return (
    <article className="album__details">
      <Image src={album.thumb} alt={album.name} />
    </article>
  );
}

export default AlbumDetails;
