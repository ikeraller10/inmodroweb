"use client";

import { Zap, ShieldCheck, EyeOff, Clock, MessageSquareHeart, Filter } from "lucide-react";
import { MaskedSlideReveal } from "@/components/ui/masked-slide-reveal";
import { BorderRotate } from "@/components/ui/border-rotate";

const benefits = [
  {
    icon: Zap,
    title: "Propuestas activas",
    desc: "Las propuestas vienen a ti, no al revés. Olvídate de scrollear durante horas.",
  },
  {
    icon: MessageSquareHeart,
    title: "Habla solo con quien quiere",
    desc: "Match mutuo. Sin contactos en frío ni intermediarios infinitos.",
  },
  {
    icon: ShieldCheck,
    title: "Información clara desde el minuto uno",
    desc: "Disponibilidad real, precio cerrado y datos verificados.",
  },
  {
    icon: EyeOff,
    title: "Tus datos siempre privados",
    desc: "Tus datos personales solo se comparten cuando hay match mutuo confirmado.",
  },
  {
    icon: Clock,
    title: "Cierra en días, no en semanas",
    desc: "Buscar piso ya no tiene por qué durar semanas. Match → Visita → Firma.",
  },
  {
    icon: Filter,
    title: "Cero spam",
    desc: "Recibe drops solo si tu perfil encaja. Sin anuncios masivos ni ruido.",
  },
];

const greenGradient = {
  primary: "#064e3b",
  secondary: "#10b981",
  accent: "#a7f3d0",
};

export function Benefits() {
  return (
    <section id="beneficios" className="relative py-28 lg:py-40 px-6 bg-gradient-to-b from-emerald-50/30 via-white to-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
            Beneficios
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
            <MaskedSlideReveal
              text="No busques sin sentido,"
              className="block"
            />
            <MaskedSlideReveal
              text="haz MATCH."
              className="block"
              delay={0.4}
              wordClassName="gradient-text"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <BorderRotate
                key={i}
                animationMode="auto-rotate"
                animationSpeed={6}
                gradientColors={greenGradient}
                backgroundColor="#ffffff"
                borderWidth={2}
                borderRadius={24}
                className="group w-full min-h-[220px] p-7 lg:p-9 shadow-[0_4px_30px_rgba(16,185,129,0.06)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-500">
                    <Icon
                      className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </BorderRotate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
