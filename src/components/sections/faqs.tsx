"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Qué es Inmodrop?",
    a: "Inmodrop es una nueva forma de conectar personas con propiedades (y viceversa). Sin anuncios masivos, sin buscar sin sentido y sin que nadie te moleste. Funciona con DROPS: propuestas enviadas a mano por quienes tienen algo que ofrecerte.",
  },
  {
    q: "¿Qué es un Drop?",
    a: "Un Drop es una propuesta personalizada que un propietario o inmobiliaria te envía manualmente porque tu perfil encaja con su propiedad. Si te interesa, haces match. Si no, pasas. Así de simple.",
  },
  {
    q: "¿Qué es Flow?",
    a: "Flow es el canal de comunicación que se abre justo después de un match mutuo. Desde ahí podéis hablar, compartir información y cerrar los detalles del alquiler o compraventa.",
  },
  {
    q: "¿Qué pasa si haces match?",
    a: "Cuando hay match mutuo, se desbloquea el Flow y ambos podéis ver los datos necesarios para concretar la operación: contacto directo, disponibilidad y siguientes pasos.",
  },
  {
    q: "¿Es gratis usar Inmodrop?",
    a: "Sí. Crear tu perfil y empezar a recibir Drops es 100% gratis. Si quieres más visibilidad y filtros avanzados, puedes activar Boost Priority.",
  },
  {
    q: "¿Cómo se protege mi privacidad?",
    a: "Tus datos personales solo se comparten cuando ambos hacéis match. Hasta entonces, lo que se ve es solo tu perfil compatible, sin información sensible.",
  },
  {
    q: "¿Por qué es diferente a un portal inmobiliario tradicional?",
    a: "Porque las propuestas vienen a ti, no al revés. No buscas, no scrolleas, no hablas con desconocidos. Solo recibes drops que encajan y decides. Sin spam, sin ruido, con transparencia desde el minuto uno.",
  },
];

export function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-28 lg:py-40 px-6 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
            FAQs
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
            Sin lios. Sin complicaciones.
            <br />
            <span className="gradient-text">Simple.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-500 ${
                  isOpen ? "border-emerald-300 shadow-[0_20px_60px_rgba(16,185,129,0.12)]" : "border-emerald-100/80 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base lg:text-lg font-bold tracking-tight transition-colors ${isOpen ? "text-emerald-700" : "text-foreground"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isOpen ? "bg-emerald-500 text-white rotate-180" : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-foreground/65 text-base leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
