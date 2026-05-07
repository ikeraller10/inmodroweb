"use client";

import { useState } from "react";
import { UserPlus, Sparkles, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

function bubbleClasses(distance: number | null) {
  let classes = "inline-block transition-all duration-300 ease-out cursor-default";
  switch (distance) {
    case 0:
      classes += " font-black scale-110";
      break;
    case 1:
      classes += " font-extrabold scale-105";
      break;
    case 2:
      classes += " font-bold";
      break;
    case 3:
      classes += " font-semibold";
      break;
    default:
      break;
  }
  return classes;
}

function BubbleHeading() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const segments: { text: string; className?: string }[] = [
    { text: "Buscar piso ya no tiene" },
    { text: "por qué durar semanas", className: "gradient-text" },
  ];

  let globalIdx = 0;

  const renderLine = (line: string) => {
    const words = line.split(" ");
    return words.map((word, wIdx) => {
      const wordSpans = word.split("").map((char) => {
        const idx = globalIdx;
        globalIdx += 1;
        const distance =
          hoveredIdx !== null ? Math.abs(hoveredIdx - idx) : null;
        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            className={bubbleClasses(distance)}
          >
            {char}
          </span>
        );
      });

      const isLast = wIdx === words.length - 1;
      const space = !isLast ? <span key={`sp-${wIdx}`}> </span> : null;
      if (!isLast) globalIdx += 1;

      return (
        <span key={`w-${wIdx}`}>
          <span className="inline-block whitespace-nowrap">{wordSpans}</span>
          {space}
        </span>
      );
    });
  };

  return (
    <h2
      onMouseLeave={() => setHoveredIdx(null)}
      className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance"
    >
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`block${seg.className ? ` ${seg.className}` : ""}`}
        >
          {renderLine(seg.text)}
        </span>
      ))}
    </h2>
  );
}

const steps = [
  {
    icon: UserPlus,
    title: "Crea tu perfil",
    desc: "Te registras en menos de 2 minutos. Eliges si buscas, ofreces, eres particular o inmobiliaria.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Recibe Drops",
    desc: "Propietarios e inmobiliarias te envían propuestas que encajan con tu perfil. Sin spam.",
    accent: "from-teal-400 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Aceptas o pasas",
    desc: "Si te interesa, haces match. Si no, deslizas y pasas. Tu tiempo, tus reglas.",
    accent: "from-emerald-500 to-emerald-700",
  },
  {
    icon: MessageCircle,
    title: "Inicia el Flow",
    desc: "Cuando hay match mutuo, se abre el canal de comunicación para negociar y cerrar.",
    accent: "from-emerald-600 to-teal-700",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 lg:py-40 px-6 overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
            ¿Cómo funciona?
          </span>
          <BubbleHeading />
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            Olvida los portales de siempre. Recibe propuestas que encajan contigo y haz match en cuatro pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative group">
                <GlowCard
                  glowColor="green"
                  customSize
                  className="w-full h-full min-h-[260px] p-7 transition-transform duration-500 hover:-translate-y-2"
                >
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="absolute top-1 right-1 text-7xl font-black text-emerald-100/70 leading-none select-none pointer-events-none">
                      0{i + 1}
                    </div>
                    <div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-5`}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="relative text-xl font-bold mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="relative text-sm text-foreground/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </GlowCard>

                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-emerald-400 z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
