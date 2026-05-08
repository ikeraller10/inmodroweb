"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MaskedSlideReveal } from "@/components/ui/masked-slide-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-emerald-matte {
      background: linear-gradient(180deg, #10B981 0%, #047857 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px rgba(16, 185, 129, 0.3))
          drop-shadow(0px 2px 4px rgba(4, 120, 87, 0.2));
  }

  .text-card-mint-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A7F3D0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.6))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.5));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #064E3B 0%, #022C22 50%, #021510 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(167, 243, 208, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(167, 243, 208, 0.06);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(52, 211, 153, 0.08) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow:
          inset 0 0 0 2px #52525B,
          inset 0 0 0 7px #000,
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow:
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(167, 243, 208, 0.02) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(167, 243, 208, 0.15),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .property-card-bg {
      background-image: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%),
                        url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80');
      background-size: cover;
      background-position: center;
  }

  .btn-modern-light, .btn-modern-dark, .btn-emerald {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-emerald {
      background: linear-gradient(180deg, #10B981 0%, #047857 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(16,185,129,0.3), 0 2px 4px rgba(4,120,87,0.4), 0 12px 24px -4px rgba(4,120,87,0.5), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(4,120,87,0.5);
  }
  .btn-emerald:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #34D399 0%, #059669 100%);
      box-shadow: 0 0 0 1px rgba(16,185,129,0.4), 0 6px 12px -2px rgba(4,120,87,0.5), 0 20px 32px -6px rgba(4,120,87,0.6), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(4,120,87,0.5);
  }

  .swipe-stamp {
      position: absolute;
      padding: 6px 14px;
      border-radius: 8px;
      font-weight: 900;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border: 2px solid currentColor;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "INMODROP",
  tagline1 = "Recibe Drops,",
  tagline2 = "haz match.",
  cardHeading = "Olvida buscar piso. Que el piso te encuentre.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Inmodrop</span> conecta inquilinos,
      compradores, propietarios e inmobiliarias con un sistema de propuestas
      inteligentes. Sin anuncios masivos. Sin spam. Solo match.
    </>
  ),
  metricValue = 12,
  metricLabel = "Drops nuevos",
  ctaHeading = "¿Listo para hacer match con tu próximo hogar?",
  ctaDescription = "Crea tu perfil gratis y empieza a recibir Drops compatibles contigo. Sin lios. Sin complicaciones. Simple.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .call(() => setCtaVisible(true), undefined, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* HERO TEXTS */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-emerald-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl font-light tracking-wide">
          Sin complicaciones. Para inquilinos, compradores, propietarios e inmobiliarias.
        </p>
      </div>

      {/* CTA AT END */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight max-w-4xl">
          <MaskedSlideReveal
            text={ctaHeading}
            forceTrigger={ctaVisible}
            wordClassName="text-emerald-matte"
          />
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#registro"
            className="btn-emerald flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span className="text-lg font-bold tracking-tight">Crea tu perfil gratis</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#como-funciona"
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span className="text-lg font-bold tracking-tight">Ver cómo funciona</span>
          </a>
        </div>
      </div>

      {/* DEEP CARD */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {/* BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5rem] lg:text-[7rem] font-black uppercase tracking-tighter text-card-mint-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            {/* IPHONE MOCKUP */}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface — Inmodrop */}
                    <div className="relative w-full h-full pt-12 px-4 pb-6 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-emerald-300/70 uppercase tracking-widest font-bold mb-0.5">
                            Inmodrop
                          </span>
                          <span className="text-base font-bold tracking-tight text-white">
                            Tus Drops
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-700/10 text-white flex items-center justify-center font-bold text-sm border border-emerald-400/20 shadow-lg shadow-black/50">
                            M
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[8px] font-black text-white flex items-center justify-center shadow-md">
                            <span className="counter-val">0</span>
                          </div>
                        </div>
                      </div>

                      {/* Property Card (Tinder style) */}
                      <div className="phone-widget relative flex-1 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10">
                        <div className="property-card-bg absolute inset-0" aria-hidden="true" />

                        {/* Top badge */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
                          <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg uppercase tracking-wider">
                            Drop nuevo
                          </span>
                          <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full">
                            1/4
                          </span>
                        </div>

                        {/* MATCH stamp */}
                        <div
                          className="swipe-stamp text-emerald-400 top-6 right-4 rotate-12 opacity-0"
                          style={{ animation: "fadeIn 0.6s ease-out 3s forwards" }}
                        >
                          MATCH
                        </div>

                        {/* Bottom info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                          <div className="flex items-baseline justify-between mb-1">
                            <h3 className="text-white text-base font-bold tracking-tight drop-shadow-md">
                              Loft en Malasaña
                            </h3>
                            <span className="text-emerald-300 text-sm font-extrabold drop-shadow-md">
                              1.450€
                            </span>
                          </div>
                          <p className="text-white/70 text-[10px] mb-2 leading-tight">
                            2 hab · 65m² · Reformado · Disponible ya
                          </p>
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="text-[8px] bg-white/10 backdrop-blur-md border border-white/15 text-white/90 px-2 py-0.5 rounded-full">
                              Mascotas ✓
                            </span>
                            <span className="text-[8px] bg-white/10 backdrop-blur-md border border-white/15 text-white/90 px-2 py-0.5 rounded-full">
                              Amueblado
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="phone-widget flex justify-center gap-4 mt-3">
                        <button
                          className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/50 backdrop-blur-md hover:bg-white/10 transition"
                          aria-label="Pasar"
                        >
                          <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button
                          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.5)] hover:scale-110 transition"
                          aria-label="Match"
                        >
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                        <button
                          className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/50 backdrop-blur-md hover:bg-white/10 transition"
                          aria-label="Información"
                        >
                          <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>

                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-400/30 to-emerald-700/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">¡Match!</p>
                    <p className="text-emerald-200/60 text-[10px] lg:text-xs font-medium">Loft en Malasaña</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-teal-400/30 to-teal-700/10 flex items-center justify-center border border-teal-400/30 shadow-inner">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-teal-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Flow abierto</p>
                    <p className="text-emerald-200/60 text-[10px] lg:text-xs font-medium">Habla con el propietario</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-emerald-300 mb-3">
                Match inmobiliario
              </span>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-emerald-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
