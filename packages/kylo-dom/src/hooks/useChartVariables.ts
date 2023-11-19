import { useEffect, useState } from "react";
import { DomRange, Margin, DefaultInputType } from "../types";

interface ChartVariableProps {
  width?: number;
  height?: number;
  margin?: Margin;
}
interface AxisLocation {
  top?: number;
  left?: number;
}
interface AxisLocations {
  bottom: AxisLocation;
  left: AxisLocation;
  top: AxisLocation;
  right: AxisLocation;
}
export default function useRangeVariables({
  width,
  height,
  margin,
}: ChartVariableProps) {
  const [axis, setAxis] = useState<AxisLocations>({
    bottom: { top: 0, left: 0 },
    left: { top: 0, left: 0 },
    top: { top: 0, left: 0 },
    right: { top: 0, left: 0 },
  });
  const [range, setRange] = useState<{
    x: DomRange;
    y: DomRange;
  }>({
    x: { max: 0, min: 0 },
    y: { max: 0, min: 0 },
  });
  const [bounds, setBounds] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  function getAxisLocation(width: number, height: number, margin?: Margin) {
    const marginLeft = margin?.left || 0;
    const marginTop = margin?.top || 0;
    const marginRight = margin?.right || 0;
    const marginBottom = margin?.bottom || 0;

    return {
      left: {
        top: 0,
        left: marginLeft,
      },
      top: {
        top: marginTop,
        left: 0,
      },
      bottom: {
        top: height - marginBottom,
        left: 0,
      },
      right: {
        top: 0,
        left: width - marginRight,
      },
    };
  }
  function getRange(width: number, height: number, margin?: Margin) {
    const marginLeft = margin?.left || 0;
    const marginTop = margin?.top || 0;
    const marginRight = margin?.right || 0;
    const marginBottom = margin?.bottom || 0;
    return {
      x: {
        min: marginLeft,
        max: width - marginRight + marginLeft,
      },
      y: { min: marginTop, max: height - marginBottom },
    };
  }
  function getBounds(width: number, height: number, margin?: Margin) {
    const marginLeft = margin?.left || 0;
    const marginTop = margin?.top || 0;
    const marginRight = margin?.right || 0;
    const marginBottom = margin?.bottom || 0;
    return {
      width: width - marginLeft - marginRight,
      height: height - marginTop - marginBottom,
    };
  }
  useEffect(() => {
    if (width && height) {
      const axis = getAxisLocation(width, height, margin);
      const range = getRange(width, height, margin);
      const bounds = getBounds(width, height, margin);
      setAxis(axis);
      setRange(range);
      setBounds(bounds);
    }
  }, [width, height, margin]);

  return {
    axis,
    range,
    bounds: bounds,
    margin,
  };
}
