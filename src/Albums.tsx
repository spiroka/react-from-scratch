import React, { useState } from 'react';
import useGetAlbums from './useGetAlbums';
import AlbumItem from './AlbumItem';
import Album from "./model/Album";

function Albums({ bandName }: { bandName: string }) {
  const { loading, albums } = useGetAlbums(bandName);
  const [activeAlbum, setActiveAlbum] = useState<string | null>();

  const openAlbum = (album: Album) => {
    document.body.classList.add('modal-open');
    setActiveAlbum(album.id)
  }

  const closeAlbum = () => {
    document.body.classList.remove('modal-open');
    setActiveAlbum(null);
  }

  return (
    <article>
      <header>
        <h1>{bandName}</h1>
        <h2>Albums</h2>
      </header>
      <section className="album__container">
        {loading && <p>Loading...</p>}
        {!loading &&
          albums.map((album) => (
            <AlbumItem
              active={activeAlbum === album.id}
              onClick={() => (activeAlbum ? closeAlbum() : openAlbum(album))}
              key={album.id}
              album={album}
            />
          ))}
      </section>
    </article>
  );
}

export default React.memo(Albums);
