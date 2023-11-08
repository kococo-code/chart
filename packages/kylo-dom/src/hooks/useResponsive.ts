import { useEffect, useRef, useState } from "react";

export function useResponsive<T extends HTMLElement>() {
  const domRef = useRef<T>(null);
  const [size, setSize] = useState<
    { width: number; height: number } | undefined
  >({
    width: 0,
    height: 0,
  });
  function setResponsiveSize(entries: ResizeObserverEntry[]) {
    const entry = entries[0];
    const { width: newWidth, height: newHeight } = entry.contentRect;
    console.log(size, newWidth, newHeight, size);
    setSize((size) => {
      if (size?.width !== newWidth || size?.height !== newHeight) {
        return {
          width: newWidth,
          height: newHeight,
        };
      }
      return size;
    });
  }

  useEffect(() => {
    const element = domRef.current;
    if (element) {
      const resizeObserver = new ResizeObserver(setResponsiveSize);
      resizeObserver.observe(element);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [domRef, domRef.current]);

  return {
    domRef,
    size,
  };
}
