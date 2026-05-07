"use client";

import { Quote, Star } from "lucide-react";

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

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
            Historias reales
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
            Gente que hizo match
            <br />
            y ya está en su <span className="gradient-text">nuevo piso</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
            ¿Tu historia será la próxima?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="group relative bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100/80 rounded-3xl p-8 lg:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="absolute top-7 right-7 w-10 h-10 text-emerald-200" strokeWidth={1.5} />

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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
