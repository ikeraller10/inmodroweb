import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inmodrop — Recibe Drops, haz match",
  description:
    "La plataforma de match inmobiliario. Sin buscar sin sentido. Recibe propuestas de pisos compatibles contigo y haz match al instante.",
  keywords: [
    "alquiler",
    "compraventa",
    "inmobiliaria",
    "match",
    "drops",
    "inmodrop",
    "tinder inmobiliario",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
