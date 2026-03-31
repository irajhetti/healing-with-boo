import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientMagic } from "@/components/ui/AmbientMagic";
import { CursorTrail } from "@/components/ui/CursorTrail";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Healing with Boo | Deep Shamanic & Massage Therapy in Boscombe",
    template: "%s | Healing with Boo",
  },
  description:
    "Personal, intentional and deep healing massage and shamanic energy work in Boscombe, Bournemouth. Book with Leah today.",
  keywords: [
    "massage therapy Boscombe",
    "shamanic healing Bournemouth",
    "deep tissue massage",
    "energy healing UK",
    "holistic therapy",
    "Healing with Boo",
  ],
  openGraph: {
    title: "Healing with Boo | Deep Shamanic & Massage Therapy",
    description:
      "Personal, intentional and deep healing massage and shamanic energy work in Boscombe, Bournemouth.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body antialiased">
        <AmbientMagic />
        <CursorTrail />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
