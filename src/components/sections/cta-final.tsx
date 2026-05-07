"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BubbleText } from "@/components/ui/bubble-text";
import {
  SVGs,
  type BeamPath,
  type GradientColorsType,
} from "@/components/ui/pulse-beams";

const DURATION = 2400;

const stats: { display: (t: number) => string; label: string }[] = [
  {
    label: "Perfiles activos",
    display: (t) => `+${(2.5 * t).toFixed(1)}K`,
  },
  {
    label: "Matches/mes",
    display: (t) => `+${Math.round(850 * t)}`,
  },
  {
    label: "Tiempo medio match",
    display: (t) => `<${Math.round(48 * t)}h`,
  },
];

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
  start: "#a7f3d0",
  middle: "#ffffff",
  end: "#a7f3d0",
};

function useAnimatedProgress(duration: number) {
  const [t, setT] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

        let frame = 0;
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          setT(easeOutCubic(progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [duration]);

  return { t, ref };
}

export function CTAFinal() {
  const { t, ref: statsRef } = useAnimatedProgress(DURATION);

  return (
    <section id="registro" className="relative py-28 lg:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_70%,rgba(167,243,208,0.5),transparent_50%)]" />

      {/* Pulse beams backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SVGs
          beams={beams}
          width={858}
          height={434}
          baseColor="rgba(255,255,255,0.18)"
          accentColor="rgba(255,255,255,0.55)"
          gradientColors={gradientColors}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 mb-8">
          <Sparkles className="w-4 h-4" />
          Empezar ahora · Es gratis
        </span>

        <BubbleText
          text={"¿Estás listo para hacer match\ncon tu próximo hogar?"}
          className="text-4xl md:text-6xl lg:text-7xl mb-6 text-balance"
        />

        <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Crea tu perfil en menos de 2 minutos y empieza a recibir Drops compatibles contigo. Miles ya están haciendo match.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="group inline-flex items-center gap-3 bg-white text-emerald-700 font-extrabold text-base px-8 py-4 rounded-full shadow-2xl hover:shadow-white/30 hover:-translate-y-1 transition-all"
          >
            Crea tu perfil gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-3 bg-transparent text-white font-bold text-base px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 backdrop-blur-md transition-all"
          >
            Ver beneficios
          </a>
        </div>

        <div
          ref={statsRef}
          className="mt-16 flex items-center justify-center gap-8 lg:gap-16 flex-wrap"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl lg:text-5xl font-black text-white tracking-tight tabular-nums">
                {s.display(t)}
              </p>
              <p className="text-xs lg:text-sm uppercase tracking-widest text-white/70 font-bold mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
