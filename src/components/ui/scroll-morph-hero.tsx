"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg shadow-emerald-900/20 bg-emerald-50"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`Drop ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-emerald-700 to-emerald-900 flex flex-col items-center justify-center p-3 border border-emerald-500/30"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[8px] font-bold text-emerald-300 uppercase tracking-widest mb-1">
            Drop
          </p>
          <p className="text-xs font-semibold text-white text-center leading-tight">
            Ver detalles
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const TOTAL_IMAGES = 20;

const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=80",
];

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export function ScrollMorphHero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Container size
  useEffect(() => {
    const node = stickyRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(node);
    setContainerSize({ width: node.offsetWidth, height: node.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // Page scroll progress (replaces virtual scroll)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 0-25% of section: morph circle → arc
  const morphProgress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 50, damping: 25 });

  // 25-100% of section: rotate the arc
  const scrollRotate = useTransform(scrollYProgress, [0.25, 1], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 50, damping: 25 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const node = stickyRef.current;
    if (!node) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    node.addEventListener("mousemove", handleMouseMove);
    return () => node.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Intro sequence (triggered when section enters viewport)
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && introPhase === "scatter") {
          const t1 = setTimeout(() => setIntroPhase("line"), 400);
          const t2 = setTimeout(() => setIntroPhase("circle"), 2200);
          observer.disconnect();
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [introPhase]);

  // Random scatter positions
  const scatterPositions = useMemo(
    () =>
      IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 800,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    []
  );

  // Subscribe to motion values
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => {
      u1();
      u2();
      u3();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.85, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.85, 1], [20, 0]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-white">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(16,185,129,0.08), transparent 60%)",
          }}
        />

        <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
          {/* Intro text — only visible during scatter/line/circle (before morph starts) */}
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : introPhase === "scatter"
                    ? { opacity: 0 }
                    : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance"
            >
              Más de <span className="gradient-text">2.500 hogares</span>
              <br />
              esperando su match.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 0.7 - morphValue }
                  : { opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 text-[11px] font-bold tracking-[0.3em] text-emerald-600 uppercase"
            >
              Scroll para explorar
            </motion.p>
          </div>

          {/* Arc-active content (fades in once morph is near complete) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[12%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 max-w-3xl"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
              El catálogo Inmodrop
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 text-balance">
              Cada hogar tiene{" "}
              <span className="gradient-text">su persona</span>
            </h3>
            <p className="text-sm md:text-base text-foreground/60 max-w-xl leading-relaxed">
              Lofts en Malasaña, áticos en Chamberí, casas con jardín en la sierra,
              pisos compartidos cerca del campus. Cada Drop es una historia esperando
              encontrar su match.
            </p>
          </motion.div>

          {/* Cards stage */}
          <div className="relative flex items-center justify-center w-full h-full">
            {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const lineSpacing = 70;
                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                const lineX = i * lineSpacing - lineTotalWidth / 2;
                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
                const isMobile = containerSize.width < 768;
                const minDimension = Math.min(
                  containerSize.width,
                  containerSize.height
                );

                const circleRadius = Math.min(minDimension * 0.32, 320);
                const circleAngle = (i / TOTAL_IMAGES) * 360;
                const circleRad = (circleAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius,
                  rotation: circleAngle + 90,
                };

                const baseRadius = Math.min(
                  containerSize.width,
                  containerSize.height * 1.5
                );
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                const arcCenterY = arcApexY + arcRadius;

                const spreadAngle = isMobile ? 100 : 130;
                const startAngle = -90 - spreadAngle / 2;
                const step = spreadAngle / (TOTAL_IMAGES - 1);

                const scrollProgress = Math.min(
                  Math.max(rotateValue / 360, 0),
                  1
                );
                const maxRotation = spreadAngle * 0.8;
                const boundedRotation = -scrollProgress * maxRotation;

                const currentArcAngle =
                  startAngle + i * step + boundedRotation;
                const arcRad = (currentArcAngle * Math.PI) / 180;

                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius + parallaxValue,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(
                    circlePos.rotation,
                    arcPos.rotation,
                    morphValue
                  ),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                };
              }

              return (
                <FlipCard key={i} src={src} index={i} target={target} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
