"use client";

import { useEffect, useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#solucion", label: "Solución" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#perfiles", label: "Perfiles" },
  { href: "#faqs", label: "FAQs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-emerald-100/60 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition">
            <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Inmo<span className="text-emerald-600">drop</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-emerald-600 transition relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold text-foreground/80 hover:text-emerald-600 transition px-4 py-2"
          >
            Iniciar sesión
          </a>
          <a
            href="#registro"
            className="text-sm font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
          >
            Crear perfil
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-emerald-50"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-100">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 text-base font-medium hover:bg-emerald-50 rounded-lg"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#registro"
              onClick={() => setOpen(false)}
              className="mt-2 text-center font-bold bg-emerald-500 text-white px-5 py-3 rounded-full shadow-lg"
            >
              Crear perfil
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
