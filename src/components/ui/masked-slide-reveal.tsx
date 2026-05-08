"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

interface MaskedSlideRevealProps {
  text: string;
  staggerDelay?: number;
  delay?: number;
  className?: string;
  wordClassName?: string;
}

export function MaskedSlideReveal({
  text,
  staggerDelay = 0.08,
  delay = 0,
  className = "",
  wordClassName = "",
}: MaskedSlideRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            lineHeight: 1.1,
            paddingBottom: "0.05em",
            marginRight: "0.25em",
          }}
        >
          <motion.span
            variants={itemVariants}
            className={wordClassName}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
