"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, Video, Filter, TrendingUp } from "lucide-react";

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

const features = [
  { icon: Filter, label: "Filtros extras avanzados" },
  { icon: Video, label: "Vídeo + imagen de presentación" },
  { icon: TrendingUp, label: "Más visibilidad para tus drops" },
  { icon: Rocket, label: "Drops mejor filtrados y prioritarios" },
];

const stats = [
  { target: 4, prefix: "x", suffix: "", label: "Visibilidad" },
  { target: 38, prefix: "+", suffix: "%", label: "Matches" },
  { target: 12, prefix: "", suffix: "", label: "Drops/sem" },
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
            Cuanto más completo
            <br />
            tu perfil,{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
              más Drops recibirás
            </span>
          </h2>
          <p className="text-lg text-emerald-100/70 mb-10 font-light leading-relaxed max-w-xl">
            Boost Priority desbloquea filtros extra, vídeos de presentación y más visibilidad para que tu perfil destaque entre los demás. Más matches en menos tiempo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/10 transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium text-white">{f.label}</span>
                </div>
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
              {[
                { label: "Vídeo de presentación", done: true },
                { label: "Filtros avanzados", done: true },
                { label: "Verificación de identidad", done: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-2.5 px-4 rounded-lg ${
                    item.done ? "bg-emerald-500/10 border border-emerald-400/30" : "bg-white/5 border border-white/10"
                  }`}
                >
                  <span className="text-sm text-white">{item.label}</span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                      item.done ? "bg-emerald-400 text-emerald-900" : "bg-white/10 text-white/40"
                    }`}
                  >
                    {item.done ? "✓" : "+"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
