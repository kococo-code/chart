import { twMerge } from "tailwind-merge";

interface DashedLineProps {
  className?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}
export function DashedLine({ className, x, y, width }: DashedLineProps) {
  return (
    <foreignObject x={x} y={y} width={width} height={2}>
      <div
        className={twMerge(
          "w-full h-1 border-dashed border-t-[1px] border-t-[#222222]/20",
          className
        )}
      ></div>
    </foreignObject>
  );
}
