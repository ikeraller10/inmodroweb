"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export function BubbleText({ text, className }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <h2
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "font-bold text-white/85 tracking-tight",
        className
      )}
    >
      {text.split("").map((char, idx) => {
        if (char === "\n") return <br key={`br-${idx}`} />;

        const distance =
          hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null;

        let classes =
          "inline-block transition-all duration-300 ease-out cursor-default";

        switch (distance) {
          case 0:
            classes +=
              " font-black text-white scale-110 drop-shadow-[0_0_25px_rgba(167,243,208,0.9)]";
            break;
          case 1:
            classes += " font-extrabold text-emerald-50 scale-105";
            break;
          case 2:
            classes += " font-bold text-emerald-100";
            break;
          case 3:
            classes += " font-semibold text-emerald-100/90";
            break;
          default:
            break;
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={classes}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </h2>
  );
}
