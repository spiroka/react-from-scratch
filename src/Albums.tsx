import React from 'react';
import useGetAlbums from './useGetAlbums';
import AlbumDetails from './AlbumDetails';

function Albums({ bandName }: { bandName: string }) {
  const { loading, albums } = useGetAlbums(bandName);

  return (
    <article>
      <header>
        <h1>{bandName}</h1>
        <h2>Albums</h2>
      </header>
      <section className="album__container">
        {loading && <p>Loading...</p>}
        {!loading && albums.map((album) => <AlbumDetails key={album.id} album={album} />)}
      </section>
    </article>
  );
}

export default Albums;
