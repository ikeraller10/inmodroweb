"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Rocket, Video, Filter, TrendingUp, Check } from "lucide-react";
import { MaskedSlideReveal } from "@/components/ui/masked-slide-reveal";

const PROGRESS_TARGET = 87;
const DURATION = 3800;

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
        const easeInOutCubic = (x: number) =>
          x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

        let frame = 0;
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          setT(easeInOutCubic(progress));
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

const cardVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.025 },
};

const filterIconVariants: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: [0, -15, 15, -10, 10, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const videoIconVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: [1, 1.2, 1, 1.15, 1],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const trendingIconVariants: Variants = {
  rest: { y: 0, x: 0 },
  hover: {
    y: [0, -2, 0],
    x: [0, 1, 0],
    transition: { duration: 0.5, ease: "easeOut", repeat: 1 },
  },
};

const rocketIconVariants: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: {
    y: -10,
    rotate: 18,
    scale: 1.05,
    transition: { type: "spring", stiffness: 220, damping: 14 },
  },
};

const features = [
  {
    icon: Filter,
    label: "Filtros extras avanzados",
    iconVariants: filterIconVariants,
  },
  {
    icon: Video,
    label: "Vídeo + imagen de presentación",
    iconVariants: videoIconVariants,
  },
  {
    icon: TrendingUp,
    label: "Más visibilidad para tus drops",
    iconVariants: trendingIconVariants,
  },
  {
    icon: Rocket,
    label: "Drops mejor filtrados y prioritarios",
    iconVariants: rocketIconVariants,
  },
];

const stats = [
  { target: 4, prefix: "x", suffix: "", label: "Visibilidad" },
  { target: 38, prefix: "+", suffix: "%", label: "Matches" },
  { target: 12, prefix: "", suffix: "", label: "Drops/sem" },
];

const checklist = [
  { label: "Vídeo de presentación", threshold: 0.45 },
  { label: "Filtros avanzados", threshold: 0.7 },
  { label: "Verificación de identidad", threshold: 0.92 },
];

export function Boost() {
  const { t, ref: progressRef } = useAnimatedProgress(DURATION);
  const progress = Math.round(PROGRESS_TARGET * t);

  return (
    <section className="relative py-28 lg:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#022C22] via-[#064E3B] to-[#022C22]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.4),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.4),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-emerald-300 mb-5">
            <Rocket className="w-4 h-4" /> Boost Priority
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white text-balance">
            <MaskedSlideReveal
              text="Cuanto más completo"
              className="block"
            />
            <MaskedSlideReveal text="tu perfil," delay={0.4} />{" "}
            <MaskedSlideReveal
              text="más Drops recibirás"
              delay={0.7}
              wordClassName="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent"
            />
          </h2>
          <p className="text-lg text-emerald-100/70 mb-10 font-light leading-relaxed max-w-xl">
            Boost Priority desbloquea filtros extra, vídeos de presentación y más visibilidad para que tu perfil destaque entre los demás. Más matches en menos tiempo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  variants={cardVariants}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover="hover"
                  animate="rest"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 cursor-default overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-emerald-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 overflow-visible">
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-emerald-300/40 blur-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      variants={{
                        rest: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 1, scale: 1.4 },
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden="true"
                    />
                    <motion.span
                      variants={f.iconVariants}
                      className="relative z-10 inline-flex"
                    >
                      <Icon
                        className="w-4 h-4 text-white"
                        strokeWidth={2.5}
                      />
                    </motion.span>
                  </div>

                  <span className="text-sm font-medium text-white relative">
                    {f.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <a
            href="#registro"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold px-7 py-4 rounded-full shadow-2xl shadow-emerald-900/40 hover:shadow-emerald-900/60 hover:-translate-y-1 transition-all"
          >
            Descubrir Boost Priority
            <Rocket className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-emerald-500/30 blur-3xl rounded-full" aria-hidden="true" />
          <div
            ref={progressRef}
            className="relative bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-2xl border border-white/15 rounded-[32px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-emerald-200/60 text-xs uppercase tracking-widest font-bold mb-1">
                  Tu perfil
                </p>
                <h3 className="text-white text-2xl font-bold tabular-nums">
                  {progress}% completado
                </h3>
              </div>
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                Boost ON
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.6)] transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((s) => {
                const value = Math.round(s.target * t);
                return (
                  <div
                    key={s.label}
                    className="text-center bg-white/5 border border-white/10 rounded-xl py-4"
                  >
                    <p className="text-2xl font-extrabold bg-gradient-to-b from-white to-emerald-200 bg-clip-text text-transparent tabular-nums">
                      {s.prefix}
                      {value}
                      {s.suffix}
                    </p>
                    <p className="text-[10px] text-emerald-200/60 uppercase tracking-wider font-bold mt-0.5">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2.5">
              {checklist.map((item) => {
                const done = t >= item.threshold;
                return (
                  <motion.div
                    key={item.label}
                    animate={{
                      backgroundColor: done
                        ? "rgba(16, 185, 129, 0.10)"
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: done
                        ? "rgba(52, 211, 153, 0.30)"
                        : "rgba(255, 255, 255, 0.10)",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center justify-between py-2.5 px-4 rounded-lg border"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <motion.span
                      animate={{
                        backgroundColor: done
                          ? "rgb(52, 211, 153)"
                          : "rgba(255, 255, 255, 0.10)",
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative w-5 h-5 rounded-full flex items-center justify-center overflow-hidden"
                    >
                      {done && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                          transition={{
                            duration: 0.55,
                            ease: [0.34, 1.56, 0.64, 1],
                            times: [0, 0.6, 1],
                          }}
                          className="absolute inset-0 rounded-full bg-emerald-300"
                          style={{ filter: "blur(6px)" }}
                        />
                      )}
                      <AnimatePresence mode="wait" initial={false}>
                        {done ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -120, opacity: 0 }}
                            animate={{
                              scale: 1,
                              rotate: 0,
                              opacity: 1,
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 550,
                              damping: 14,
                              mass: 0.6,
                            }}
                            className="relative z-10 text-emerald-900"
                          >
                            <Check
                              className="w-3 h-3"
                              strokeWidth={3.5}
                              aria-label="Completado"
                            />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="empty"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/40"
                            aria-hidden="true"
                          />
                        )}
                      </AnimatePresence>
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
