
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

// Optimize fonts with Next.js font system
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inframart | Premium Construction Marketplace",
  description: "Source materials, find professionals, and manage construction projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={cn(
        "min-h-screen bg-slate-50 font-sans antialiased selection:bg-orange-100 selection:text-orange-900",
        // Force overflow-x-hidden to prevent accidental scrollbars if animations go wide
        "overflow-x-hidden"
      )}>
        <Navbar />
        {/* Main wrapper with padding safe-guards */}
        <main className="flex-1 w-full max-w-[1920px] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
