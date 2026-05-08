"use client";

import React, { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 140, spread: 30 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "green",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      card.style.setProperty("--x", localX.toFixed(2));
      card.style.setProperty("--y", localY.toFixed(2));
      card.style.setProperty(
        "--xp",
        (e.clientX / window.innerWidth).toFixed(2)
      );
      card.style.setProperty(
        "--yp",
        (e.clientY / window.innerHeight).toFixed(2)
      );
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const inlineStyles: CSSProperties & Record<string, string | number> = {
    "--base": base,
    "--spread": spread,
    "--radius": "24",
    "--border": "3",
    "--backdrop": "rgba(255, 255, 255, 0.55)",
    "--backup-border": "var(--backdrop)",
    "--size": "340",
    "--outer": "1",
    "--saturation": "100",
    "--lightness": "55",
    "--bg-spot-opacity": "0.35",
    "--border-spot-opacity": "1",
    "--border-light-opacity": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 145) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 60) * 1%) / var(--bg-spot-opacity, 0.35)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "100% 100%",
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
  };

  if (width !== undefined) {
    (inlineStyles as CSSProperties).width =
      typeof width === "number" ? `${width}px` : width;
  }
  if (height !== undefined) {
    (inlineStyles as CSSProperties).height =
      typeof height === "number" ? `${height}px` : height;
  }

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      -webkit-mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask-composite: source-in, xor;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc((var(--x, 0) + var(--border)) * 1px)
        calc((var(--y, 0) + var(--border)) * 1px),
        hsl(var(--hue, 145) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc((var(--x, 0) + var(--border)) * 1px)
        calc((var(--y, 0) + var(--border)) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={inlineStyles}
        className={`
          ${getSizeClasses()}
          rounded-3xl
          relative
          shadow-[0_1rem_2rem_-1rem_rgba(16,185,129,0.25)]
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow />
        {children}
      </div>
    </>
  );
};
