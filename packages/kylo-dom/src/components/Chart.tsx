import React from "react";
interface ChartProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}
export function Chart({ children, ...rest }: ChartProps) {
  return <svg {...rest}>{children}</svg>;
}
