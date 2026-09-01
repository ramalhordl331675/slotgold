import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SlotGold - Portal de Comparação de Plataformas de Slots",
  description: "Compare as melhores plataformas de slots online. Análises imparciais, bônus exclusivos e avaliações reais. Encontre a plataforma ideal para você.",
  keywords: ["slots", "cassino online", "plataformas de slots", "comparação", "bônus", "avaliações"],
  authors: [{ name: "SlotGold" }],
  creator: "SlotGold",
  publisher: "SlotGold",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://slotgold.com",
    title: "SlotGold - Portal de Comparação de Plataformas de Slots",
    description: "Compare as melhores plataformas de slots online. Análises imparciais, bônus exclusivos e avaliações reais.",
    siteName: "SlotGold",
  },
  twitter: {
    card: "summary_large_image",
    title: "SlotGold - Portal de Comparação de Plataformas de Slots",
    description: "Compare as melhores plataformas de slots online. Análises imparciais, bônus exclusivos e avaliações reais.",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}