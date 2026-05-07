"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export function CTAFinal() {
  return (
    <section id="registro" className="relative py-28 lg:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_70%,rgba(167,243,208,0.5),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 mb-8">
          <Sparkles className="w-4 h-4" />
          Empezar ahora · Es gratis
        </span>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 text-balance">
          ¿Estás listo para hacer match
          <br />
          con tu próximo hogar?
        </h2>

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

        <div className="mt-16 flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
          {[
            { n: "+2.5K", l: "Perfiles activos" },
            { n: "+850", l: "Matches/mes" },
            { n: "<48h", l: "Tiempo medio match" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl lg:text-5xl font-black text-white tracking-tight">{s.n}</p>
              <p className="text-xs lg:text-sm uppercase tracking-widest text-white/70 font-bold mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
