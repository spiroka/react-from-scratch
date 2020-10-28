import React, { useState, useCallback } from 'react';
import useGetAlbums from './useGetAlbums';
import AlbumItem from './AlbumItem';
import Album from "./model/Album";

function Albums({ bandName }: { bandName: string }) {
  const { loading, albums } = useGetAlbums(bandName);
  const [activeAlbum, setActiveAlbum] = useState<string | null>();

  const toggleAlbum = useCallback((album: Album) => {
    setActiveAlbum((activeAlbum) => {
      if (activeAlbum) {
        document.body.classList.remove('modal-open');
        return null;
      } else {
        document.body.classList.add('modal-open');
        return album.id;
      }
    });
  }, []);

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
              focusable={!activeAlbum}
              onClick={toggleAlbum}
              key={album.id}
              album={album}
            />
          ))}
      </section>
    </article>
  );
}

export default React.memo(Albums);
