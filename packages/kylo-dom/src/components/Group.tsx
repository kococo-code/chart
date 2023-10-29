import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface GroupProps extends React.SVGProps<SVGGElement> {
  top?: number;
  left?: number;
}

export const Group = forwardRef(
  (
    { top, left, transform, className, children, ...rest }: GroupProps,
    ref: ForwardedRef<SVGGElement>
  ) => {
    return (
      <g
        ref={ref}
        className={twMerge("kylo-group", className)}
        transform={transform || `translate(${left}, ${top})`}
        {...rest}
      >
        {children}
      </g>
    );
  }
);
