import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function Container({
  className,
  children,
  ...rest
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "border rounded shadow-lg p-4 h-[350px] w-full",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Container.ChartWrapper = forwardRef(
  (
    { className, children, ...rest }: React.HTMLProps<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge("w-full h-[calc(100%-3.5rem)]", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.Title = ({
  className,
  children,
  ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1 className={twMerge("font-semibold text-sm", className)} {...rest}>
      {children}
    </h1>
  );
};
