"use client";

import React, {
  type CSSProperties,
  type ReactNode,
  type HTMLAttributes,
} from "react";

type AnimationMode = "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: "#064e3b",
  secondary: "#10b981",
  accent: "#a7f3d0",
};

export const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = "",
  animationMode = "auto-rotate",
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = "#ffffff",
  borderWidth = 2,
  borderRadius = 24,
  style = {},
  ...props
}) => {
  const getAnimationClass = () => {
    switch (animationMode) {
      case "auto-rotate":
        return "gradient-border-auto";
      case "rotate-on-hover":
        return "gradient-border-hover";
      case "stop-rotate-on-hover":
        return "gradient-border-stop-hover";
      default:
        return "";
    }
  };

  const combinedStyle: CSSProperties = {
    ["--gradient-primary" as string]: gradientColors.primary,
    ["--gradient-secondary" as string]: gradientColors.secondary,
    ["--gradient-accent" as string]: gradientColors.accent,
    ["--bg-color" as string]: backgroundColor,
    ["--border-width" as string]: `${borderWidth}px`,
    ["--border-radius" as string]: `${borderRadius}px`,
    ["--animation-duration" as string]: `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 30%,
        ${gradientColors.secondary} 33%,
        ${gradientColors.primary} 40%,
        ${gradientColors.primary} 50%,
        ${gradientColors.secondary} 77%,
        ${gradientColors.accent} 80%,
        ${gradientColors.secondary} 83%,
        ${gradientColors.primary} 90%
      )
    `,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
    ...style,
  };

  return (
    <div
      className={`gradient-border-component ${getAnimationClass()} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};
