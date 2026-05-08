"use client";

import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: ReactNode;
}

export function ShineBorder({
  borderRadius = 24,
  borderWidth = 2,
  duration = 8,
  color = "#10b981",
  className,
  children,
}: ShineBorderProps) {
  const colorString = Array.isArray(color) ? color.join(",") : color;

  return (
    <div
      style={
        {
          "--shine-border-radius": `${borderRadius}px`,
        } as CSSProperties
      }
      className={cn("relative isolate", className)}
    >
      <div
        aria-hidden="true"
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient":
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "--background-radial-gradient": `radial-gradient(transparent, transparent, ${colorString}, transparent, transparent)`,
          } as CSSProperties
        }
        className='pointer-events-none absolute inset-0 z-20 rounded-[var(--shine-border-radius)] p-[var(--border-width)] will-change-[background-position] [background-image:var(--background-radial-gradient)] [background-size:300%_300%] [mask:var(--mask-linear-gradient)] [mask-composite:exclude] [-webkit-mask-composite:xor] motion-safe:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]'
      />
      {children}
    </div>
  );
}
