import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Loader from "@/components/chrome/Loader";
import Nav from "@/components/chrome/Nav";
import Menu from "@/components/chrome/Menu";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import Cursor from "@/components/chrome/Cursor";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Maghrib — Montakhab | The Heart of the Atlas",
  description:
    "A cinematic concept experience for the Morocco national football team. From the mountains, a roar.",
  keywords: [
    "Morocco",
    "football",
    "Atlas Lions",
    "Montakhab",
    "World Cup",
    "3D web",
    "WebGL",
  ],
  openGraph: {
    title: "Al Maghrib — The Heart of the Atlas",
    description:
      "A cinematic concept experience for the Morocco national football team.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased grain">
        <Loader />
        <Cursor />
        <Nav />
        <Menu />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
