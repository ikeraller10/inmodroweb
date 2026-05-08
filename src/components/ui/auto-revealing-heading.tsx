"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

type AutoRevealingHeadingProps = {
  text: string;
  splitBy?: "letter" | "word";
  delay?: number;
  className?: string;
};

export function AutoRevealingHeading({
  text,
  splitBy = "word",
  delay = 0.1,
  className = "",
}: AutoRevealingHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const lines = text.split("\n");
  const items: Array<{ kind: "word" | "break"; value: string }> = [];
  lines.forEach((line, lineIdx) => {
    const tokens = splitBy === "word" ? line.split(" ") : line.split("");
    tokens.forEach((tok) => items.push({ kind: "word", value: tok }));
    if (lineIdx < lines.length - 1) items.push({ kind: "break", value: "" });
  });

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {items.map((item, index) =>
        item.kind === "break" ? (
          <br key={`br-${index}`} />
        ) : (
          <motion.span
            key={`w-${index}`}
            variants={itemVariants}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: splitBy === "word" ? "0.25em" : "0.05em" }}
          >
            {item.value}
          </motion.span>
        )
      )}
    </motion.span>
  );
}
