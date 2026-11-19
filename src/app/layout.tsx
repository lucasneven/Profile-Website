import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { InlineScript } from "@/components/site/InlineScript";
import { IntroCurtain, introScript } from "@/components/site/IntroCurtain";
import { MotionProvider } from "@/components/site/motion";
import "./globals.css";

// The site's only font: bold for headings, regular for body text.
// It's a variable font, so every weight from 100 to 800 comes in one file.
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Lucas Neven",
  description:
    "Lucas Neven: I build apps, start things, and invest. Junior at Malibu High, CS at Santa Monica College.",
};

// Always dark: the browser paints dark from the very first frame and tints its own UI to match
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The site is always dark. introScript may add an "intro" class before paint (see IntroCurtain.tsx).
    <html lang="en" className={`dark ${mono.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={introScript} />
      </head>
      <body>
        <IntroCurtain />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
