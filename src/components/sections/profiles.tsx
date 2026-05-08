"use client";

import { Search, ShoppingBag, KeyRound, Building2, ArrowUpRight } from "lucide-react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { MagicText } from "@/components/ui/magic-text";
import { MaskedSlideReveal } from "@/components/ui/masked-slide-reveal";

const parallaxImages = [
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80", alt: "Loft moderno" },
  { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80", alt: "Salón con vistas" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", alt: "Edificio moderno" },
  { src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80", alt: "Cocina luminosa" },
  { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80", alt: "Dormitorio acogedor" },
  { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80", alt: "Salón de diseño" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", alt: "Edificio urbano" },
];

const profiles = [
  {
    icon: Search,
    label: "Inquilino",
    title: "Recibe pisos que encajan con tu perfil.",
    bullets: [
      "Disponibilidad en tiempo real",
      "Datos privados hasta hacer match",
      "Cero llamadas comerciales",
    ],
    cta: "Crea tu perfil gratis",
    color: "emerald",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
  },
  {
    icon: ShoppingBag,
    label: "Comprador",
    title: "Viviendas filtradas por presupuesto y criterios.",
    bullets: [
      "Propiedades disponibles al momento",
      "Datos compartidos solo con match",
      "Personal shopper inmobiliario",
    ],
    cta: "Crea tu perfil gratis",
    color: "teal",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
  },
  {
    icon: KeyRound,
    label: "Propietario",
    title: "Elige tú a quién enviarle tu piso.",
    bullets: [
      "Envía Drops a perfiles compatibles",
      "Filtra al instante",
      "Sin visitas vacías",
    ],
    cta: "Publicar propiedad",
    color: "cyan",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
  },
  {
    icon: Building2,
    label: "Inmobiliaria",
    title: "Acelera cierres y ahorra tiempo en filtrados.",
    bullets: [
      "Publica tu cartera completa",
      "Drops a perfiles ya cualificados",
      "Habla solo con interesados reales",
    ],
    cta: "Publicar Cartera",
    color: "emerald",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
];

const colorMap: Record<string, { ring: string; chip: string; btn: string }> = {
  emerald: {
    ring: "from-emerald-500/40 to-emerald-700/0",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    btn: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
  },
  teal: {
    ring: "from-teal-500/40 to-teal-700/0",
    chip: "bg-teal-50 text-teal-700 border-teal-200",
    btn: "from-teal-500 to-teal-600 shadow-teal-500/30",
  },
  cyan: {
    ring: "from-cyan-500/40 to-cyan-700/0",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-200",
    btn: "from-cyan-500 to-cyan-600 shadow-cyan-500/30",
  },
};

export function Profiles() {
  return (
    <section id="perfiles" className="relative bg-white">
      <div className="pt-28 lg:pt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 mb-4">
              Para todos los perfiles
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
              <MaskedSlideReveal
                text="Encuentra o alquila"
                className="block"
              />
              <MaskedSlideReveal
                text="de manera fácil"
                className="block"
                delay={0.4}
                wordClassName="gradient-text"
              />
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              Inquilinos, compradores, propietarios e inmobiliarias. Cada uno con su flujo. Todos con match.
            </p>
          </div>
        </div>
      </div>

      <MagicText text="Inmodrop conecta cada perfil con su match. Inquilinos, compradores, propietarios e inmobiliarias. Sin anuncios masivos, sin spam, sin ruido. Solo drops que de verdad encajan." />

      <ZoomParallax images={parallaxImages} />

      <div className="px-6 pb-28 lg:pb-40 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {profiles.map((p, i) => {
            const Icon = p.icon;
            const c = colorMap[p.color];
            return (
              <article
                key={i}
                className="group relative bg-white border border-foreground/5 rounded-[28px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.18)] transition-all duration-700 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border backdrop-blur-md ${c.chip}`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                      {p.label}
                    </span>
                  </div>
                  <div className={`absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-gradient-radial ${c.ring} blur-3xl opacity-50`} />
                </div>

                <div className="p-7 lg:p-9">
                  <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-5 text-balance">
                    {p.title}
                  </h3>
                  <ul className="space-y-3 mb-7">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground/70">
                        <span className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#registro"
                    className={`inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-br ${c.btn} px-5 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-all`}
                  >
                    {p.cta}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </a>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
