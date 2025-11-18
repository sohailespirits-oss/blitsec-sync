"use client";

import clsx from "clsx";

type SpacingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  horizontal?: boolean;
  className?: string;
};

const sizeMap: Record<Exclude<SpacingProps["size"], number>, string> = {
  xs: "h-2 w-2",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function Spacing({ size = "md", horizontal = false, className }: SpacingProps) {
  const isNumber = typeof size === "number";
  const dimensionClass = isNumber ? undefined : sizeMap[size];
  const style = isNumber ? { [horizontal ? "width" : "height"]: `${size}px` } : undefined;

  return (
    <div
      aria-hidden
      className={clsx(
        dimensionClass,
        className
      )}
      style={style ?? (horizontal ? { width: "100%", height: "1px" } : { height: "100%", width: "1px" })}
    />
  );
}