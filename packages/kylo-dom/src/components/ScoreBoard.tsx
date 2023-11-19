import { clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ScoreBoardProps extends React.HTMLProps<HTMLDivElement> {}
export function ScoreBoard({ className, children, ...rest }: ScoreBoardProps) {
  return (
    <div
      className={twMerge(
        "w-fit h-fit font-semibold text-center flex flex-col gap-1 border rounded",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
interface ScoreaboardSpanProps extends React.HTMLProps<HTMLSpanElement> {
  status?: "positive" | "negative" | "idle";
  fontSize?: "sm" | "md" | "lg" | "2xl";
}
ScoreBoard.Title = ({
  className,
  children,
  status,
  ...rest
}: ScoreaboardSpanProps) => {
  const style = clsx({
    "text-[#ECECEC]": status === "idle",
    "text-[#8FE7BE]": status === "positive",
    "text-[#FB3B52]": status === "negative",
  });
  return (
    <div className="flex justify-start">
      <span
        className={twMerge("text-left text-lg text-[#878787]", style)}
        {...rest}
      >
        {children}
      </span>
    </div>
  );
};
ScoreBoard.Score = ({
  className,
  children,
  status,
  fontSize,
  ...rest
}: ScoreaboardSpanProps) => {
  const style = clsx({
    "text-[128px]": fontSize === "2xl",
    "text-[64px]": fontSize === "lg",
    "text-[32px]": fontSize === "md",
    "text-[16px]": fontSize === "sm",
    "text-[#84828E]": status === "idle",
    "text-[#53B9AB]": status === "positive",
    "text-[#E93D82]": status === "negative",
  });
  return (
    <span className={twMerge("text-[64px]", style, className)} {...rest}>
      {children}
    </span>
  );
};

ScoreBoard.Pop = ({
  className,
  status,
  children,
  ...rest
}: ScoreaboardSpanProps) => {
  const style = clsx({
    "bg-[#878787] border-[#878787] text-[#ECECEC]": status === "idle",
    "bg-[#E8FFF4] border-[#8FE7BE] text-[#8FE7BE]": status === "positive",
    "bg-[#FFEAEA] border-[#FF9F9D] text-[#FB3B52]": status === "negative",
  });
  return (
    <span
      className={twMerge("text-sm rounded w-fit px-3 py-.5", style, className)}
      {...rest}
    >
      {children}
    </span>
  );
};
