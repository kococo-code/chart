import { twMerge } from "tailwind-merge";

interface LegendProps {
  className?: string;
  categories: string[];
  colorScale: (value: string) => string;
}
export function Legend({ className, categories, colorScale }: LegendProps) {
  return (
    <div
      className={twMerge(
        "flex gap-1 list-none border bg-[#ECECEC]/20 w-fit p-1 rounded",
        className
      )}
    >
      {categories.map((category) => {
        return (
          <li className="flex gap-1 items-center">
            <div
              className="rounded-lg w-2 h-2"
              style={{ background: colorScale(category) }}
            ></div>
            <span className="text-sm">{category}</span>
          </li>
        );
      })}
    </div>
  );
}
