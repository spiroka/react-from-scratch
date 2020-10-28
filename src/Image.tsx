import React, { useState, MutableRefObject, useCallback } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  forwardRef?: MutableRefObject<HTMLImageElement | undefined>;
}

function Image({ src, alt, className, forwardRef, width, height }: ImageProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const setRef = useCallback(
    (el: HTMLImageElement) => {
      if (forwardRef) {
        forwardRef.current = el;
      }
    },
    [forwardRef]
  );

  return (
    <>
      {loading && 'Loading...'}
      <img
        className={className}
        ref={setRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

export default React.memo(Image);
