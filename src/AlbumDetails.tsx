import React, { useCallback, useRef, useState, useEffect } from 'react';
import Album from './model/Album';

interface AlbumDetailsProps {
  album: Album;
  open: boolean;
  onClose: () => void;
  initialImgRect?: DOMRect;
}

const defaultImgRect = {
  top: 0,
  left: 0,
  width: 200,
  height: 200,
} as DOMRect;

function animateElementToTargetPosition(el: HTMLElement, from: DOMRect, to: DOMRect) {
  el.style.top = `${from.top}px`;
  el.style.left = `${from.left}px`;
  el.style.width = `${from.width}px`;
  el.style.height = `${from.height}px`;
  el.style.transform = 'none';

  const scaleX = to.width / from.width;
  const translateX = to.left - from.left + (to.width - from.width) * 0.5;
  const scaleY = to.height / from.height;
  const translateY = to.top - from.top + (to.height - from.height) * 0.5;

  setTimeout(() => {
    el.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scaleX}, ${scaleY})`;
    if (!matchMedia('(prefers-reduced-motion)').matches) {
      el.style.transitionDuration = '500ms';
    } else {
      el.dispatchEvent(new Event('transitionend'));
    }
  }, 50);
}

function AlbumDetails({
  album,
  open,
  onClose,
  initialImgRect = defaultImgRect,
}: AlbumDetailsProps) {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLElement>();
  const [transitioning, setTransitioning] = useState(false);

  const onTransitionEnd = useCallback((cb) => {
    const el = imageRef.current;

    if (!el) {
      return;
    }

    el.addEventListener('transitionend', cb, { once: true });
  }, []);

  const playExitAnimation = useCallback(() => {
    const el = imageRef.current;

    if (!el) {
      return;
    }

    if (transitioning) {
      onTransitionEnd(playExitAnimation);
    } else {
      setTransitioning(true);
      animateElementToTargetPosition(el, el.getBoundingClientRect(), initialImgRect);
      onTransitionEnd(() => {
        setTransitioning(false);
        onClose();
      });
    }
  }, [transitioning, initialImgRect, onClose, onTransitionEnd]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playExitAnimation();
      }
    },
    [playExitAnimation]
  );

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

  const setInitialImagePosition = useCallback(
    (el: HTMLImageElement) => {
      imageRef.current = el;
      if (el) {
        setTransitioning(true);
        animateElementToTargetPosition(el, initialImgRect, el.getBoundingClientRect());
        onTransitionEnd(() => {
          setTransitioning(false);
          if (ref.current) {
            ref.current.focus();
          }
        });
      }
    },
    [initialImgRect, ref, onTransitionEnd]
  );

  if (!open) {
    return null;
  }

  return (
    <section ref={ref} className="album__album-details" onClick={playExitAnimation} tabIndex={0}>
      <img
        ref={setInitialImagePosition}
        src={album.thumb}
        alt={album.name}
        width={100}
        height={100}
      />
    </section>
  );
}

export default React.memo(AlbumDetails);
