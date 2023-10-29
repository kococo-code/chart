import { useEffect, useRef, useState } from "react";

export function useResponsive<T extends HTMLElement>() {
  const domRef = useRef<T>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  function setResponsiveSize() {
    if (domRef.current) {
      const element = domRef.current;
      const { width, height } = element.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }
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
  }, [domRef.current]);

  return {
    domRef,
    width,
    height,
  };
}
