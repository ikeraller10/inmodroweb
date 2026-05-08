"use client";

import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { MaskedSlideReveal } from "@/components/ui/masked-slide-reveal";

const testimonials = [
  {
    name: "María",
    role: "Inquilina",
    text: "Me llegaron dos drops, uno era exactamente lo que buscaba. Lo visité a los dos días y firmé. ¡Así da gusto!",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Julián",
    role: "Propietario",
    text: "Con Inmodrop pude elegir a quién enviarle mi piso. Nada de visitas vacías. El match fue rápido.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Lucía",
    role: "Compradora",
    text: "Me llegaron tres propuestas que encajaban al 100%. Fue como tener un personal shopper inmobiliario.",
    avatar: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "Agencia Verde",
    role: "Inmobiliaria",
    text: "Antes recibíamos contactos poco cualificados. Ahora filtramos, enviamos drops y ganamos tiempo. Mucho.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

function HolographicCard({ children, className }: HolographicCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -16;
    const rotateY = ((x - rect.width / 2) / rect.width) * 16;
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease-out",
          willChange: "transform",
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
            Historias reales
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
            <MaskedSlideReveal
              text="Gente que hizo match"
              className="block"
            />
            <MaskedSlideReveal text="y ya está en su" delay={0.45} />{" "}
            <MaskedSlideReveal
              text="nuevo piso"
              delay={0.9}
              wordClassName="gradient-text"
            />
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
            ¿Tu historia será la próxima?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" style={{ perspective: "1500px" }}>
          {testimonials.map((t, i) => (
            <HolographicCard
              key={i}
              className="group relative bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100/80 rounded-3xl p-8 lg:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_90px_rgba(16,185,129,0.22)]"
            >
              {/* Diagonal sheen for the 'holo' shimmer */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "var(--mx) var(--my)",
                }}
              />

              {/* 3D-lifted content */}
              <div className="relative" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                <Quote
                  className="absolute -top-1 right-0 w-10 h-10 text-emerald-200"
                  strokeWidth={1.5}
                />

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-8 font-medium text-balance">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-5 border-t border-emerald-100">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-emerald-200 ring-offset-2"
                    style={{ backgroundImage: `url(${t.avatar})` }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold text-base">{t.name}</p>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
