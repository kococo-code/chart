import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
export const Chart = forwardRef(
  (
    { className, children, ...rest }: React.SVGProps<SVGSVGElement>,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg ref={ref} className={twMerge("kylo-chart", className)} {...rest}>
        {children}
      </svg>
    );
  }
);
