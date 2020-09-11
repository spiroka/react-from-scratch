import React, { useState } from 'react';

function Image({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading && 'Loading...'}
      <img src={src} alt={alt} onLoad={() => setLoading(false)} />
    </>
  );
}

export default Image;
