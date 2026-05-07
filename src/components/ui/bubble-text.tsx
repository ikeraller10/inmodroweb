"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export function BubbleText({ text, className }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const lines = text.split("\n");
  let globalIdx = 0;

  const renderChar = (char: string, idx: number) => {
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
        {char}
      </span>
    );
  };

  return (
    <h2
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn("font-bold text-white/85 tracking-tight", className)}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <span key={`line-${lineIdx}`} className="block">
            {words.map((word, wIdx) => {
              const wordSpans = word.split("").map((char) => {
                const node = renderChar(char, globalIdx);
                globalIdx += 1;
                return node;
              });

              const isLast = wIdx === words.length - 1;
              const space = !isLast ? (
                <span key={`sp-${lineIdx}-${wIdx}`}> </span>
              ) : null;

              if (!isLast) globalIdx += 1;

              return (
                <span key={`w-${lineIdx}-${wIdx}`}>
                  <span className="inline-block whitespace-nowrap">
                    {wordSpans}
                  </span>
                  {space}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}
