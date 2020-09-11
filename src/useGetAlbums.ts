import { useState, useEffect } from 'react';
import Album from './model/Album';

const API_URL = 'https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=';

function prepareStringForURI(value: string): string {
  return encodeURIComponent(value.toLowerCase().replace(' ', '_'));
}

function mapAlbum(album: {
  idAlbum: string;
  strAlbum: string;
  strAlbumThumb: string;
  strDescriptionEN: string;
}): Album {
  return {
    id: album.idAlbum,
    name: album.strAlbum,
    thumb: album.strAlbumThumb,
    description: album.strDescriptionEN,
  };
}

function useGetAlbums(
  bandName: string
): {
  loading: boolean;
  albums: Album[];
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(API_URL + prepareStringForURI(bandName));
        const { album: data } = await response.json();
        setAlbums(data !== null ? data.map(mapAlbum) : []);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [bandName]);

  return { loading, albums };
}

export default useGetAlbums;
