"use client";

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
    </section>
  );
}
