# Inmodrop

Plataforma digital de match inmobiliario. Sin lios. Sin complicaciones. Simple.

> Recibe Drops, haz match. Para inquilinos, compradores, propietarios e inmobiliarias.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** structure
- **GSAP** + **ScrollTrigger** (hero cinemático)
- **lucide-react** (iconografía)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx        # Layout raíz + fuentes
│   ├── page.tsx          # Landing page
│   └── globals.css       # Tokens + utilidades Tailwind
├── components/
│   ├── ui/
│   │   └── cinematic-landing-hero.tsx   # Hero animado con GSAP
│   ├── navbar.tsx
│   └── sections/         # Cómo funciona, Perfiles, Beneficios, Boost, etc.
└── lib/
    └── utils.ts          # cn() helper
```

## Deploy

Recomendado: [Vercel](https://vercel.com/new) — conecta el repo y deploy automático.
