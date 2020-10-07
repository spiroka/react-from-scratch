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

  const scaleX = to.width / from.width;
  const translateX = to.left - from.left + (to.width - from.width) * 0.5;
  const scaleY = to.height / from.height;
  const translateY = to.top - from.top + (to.height - from.height) * 0.5;

  setTimeout(() => {
    el.style.transitionDuration = '500ms';
    el.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scaleX}, ${scaleY})`;
  });
}

function AlbumDetails({
  album,
  open,
  onClose,
  initialImgRect = defaultImgRect,
}: AlbumDetailsProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(open);
  const imageRef = useRef<HTMLElement>();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  const playEnterAnimation = useCallback(() => {
    const el = imageRef.current;

    if (!el) {
      return;
    }

    if (transitioning) {
      el.addEventListener(
        'transitionend',
        () => {
          playEnterAnimation();
        },
        { once: true }
      );
    } else {
      setTransitioning(true);
      animateElementToTargetPosition(el, initialImgRect, el.getBoundingClientRect());
      el.addEventListener(
        'transitionend',
        () => {
          setTransitioning(false);
          if (ref.current) {
            ref.current.focus();
          }
        },
        { once: true }
      );
    }
  }, [transitioning, initialImgRect, ref]);

  const playExitAnimation = useCallback(() => {
    const el = imageRef.current;

    if (!el) {
      return;
    }

    if (transitioning) {
      el.addEventListener(
        'transitionend',
        () => {
          playExitAnimation();
        },
        { once: true }
      );
    } else {
      setTransitioning(true);
      animateElementToTargetPosition(el, el.getBoundingClientRect(), initialImgRect);
      el.addEventListener(
        'transitionend',
        () => {
          setTransitioning(false);
          setVisible(false);
          onClose();
        },
        { once: true }
      );
    }
  }, [transitioning, initialImgRect, onClose, open]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playExitAnimation();
      }
    },
    [playExitAnimation]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keyup', handleKeyPress);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keyup', handleKeyPress);
      }
    };
  }, [ref, handleKeyPress]);

  const setInitialImagePosition = useCallback(
    (el: HTMLImageElement) => {
      imageRef.current = el;
      if (el) {
        playEnterAnimation();
      }
    },
    [initialImgRect]
  );

  if (!visible) {
    return null;
  }

  return (
    <section ref={ref} className="album__album-details" onClick={playExitAnimation} tabIndex={0}>
      <img ref={setInitialImagePosition} src={album.thumb} alt={album.name} />
    </section>
  );
}

export default React.memo(AlbumDetails);
