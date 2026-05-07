"use client";

import { Home, Instagram, Linkedin, Facebook } from "lucide-react";

const cols = [
  {
    title: "Producto",
    items: ["Cómo funciona", "Beneficios", "Boost Priority", "Servicios", "FAQs"],
  },
  {
    title: "Perfiles",
    items: ["Inquilinos", "Compradores", "Propietarios", "Inmobiliarias"],
  },
  {
    title: "Empresa",
    items: ["Quiénes somos", "Contacto", "Blog", "Prensa"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#021510] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.3),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">
                Inmo<span className="text-emerald-400">drop</span>
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              La plataforma de match inmobiliario. Recibe Drops, haz match. Sin lios. Sin complicaciones. Simple.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-5 text-emerald-300 text-sm uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-white/60 hover:text-emerald-400 text-sm transition">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2026 Inmodrop. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-white/50 hover:text-emerald-400 transition">
              Aviso legal
            </a>
            <a href="#" className="text-white/50 hover:text-emerald-400 transition">
              Política de privacidad
            </a>
            <a href="#" className="text-white/50 hover:text-emerald-400 transition">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
