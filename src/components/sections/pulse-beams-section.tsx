"use client";

import { Home } from "lucide-react";
import { PulseBeams, type BeamPath, type GradientColorsType } from "@/components/ui/pulse-beams";

const beams: BeamPath[] = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: 0.4,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 },
    ],
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: 0.9,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 },
    ],
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: 1.4,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 },
    ],
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: { x1: "0%", x2: "10%", y1: "-40%", y2: "-20%" },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: 0.2,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 },
    ],
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: 1.7,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 },
    ],
  },
];

const gradientColors: GradientColorsType = {
  start: "#10b981",
  middle: "#34d399",
  end: "#a7f3d0",
};

export function PulseBeamsSection() {
  return (
    <section className="relative bg-[#021510] py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.25),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center mb-16">
        <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-emerald-300 mb-4">
          La red de matches
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance max-w-3xl mx-auto">
          Cada beam es{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
            un match
          </span>{" "}
          que empieza
        </h2>
        <p className="mt-5 text-emerald-100/60 text-base md:text-lg font-light max-w-xl mx-auto">
          Miles de Drops conectando inquilinos, compradores, propietarios e
          inmobiliarias en tiempo real.
        </p>
      </div>

      <PulseBeams
        beams={beams}
        gradientColors={gradientColors}
        className="min-h-[460px]"
      >
        <button className="z-40 group cursor-pointer relative shadow-2xl shadow-emerald-900/60 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block bg-emerald-900">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(52,211,153,0.6)_0%,rgba(52,211,153,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex justify-center items-center gap-3 w-[280px] h-[100px] z-10 rounded-full bg-[#031F18] py-0.5 px-6 ring-1 ring-emerald-400/15">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
              <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-white to-emerald-200">
              Inmodrop
            </span>
          </div>
        </button>
      </PulseBeams>
    </section>
  );
}
