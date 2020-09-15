import React, { useState, MutableRefObject, useRef, useCallback } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  forwardRef?: MutableRefObject<HTMLImageElement | undefined>;
}

function Image({ src, alt, className, forwardRef }: ImageProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const setRef = useCallback((el: HTMLImageElement) => {
    if (forwardRef) {
      forwardRef.current = el;
    }
  }, [forwardRef]);

  return (
    <>
      {loading && 'Loading...'}
      <img
        className={className}
        ref={setRef}
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

export default React.memo(Image);
