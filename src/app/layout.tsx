import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work",
});

export const metadata: Metadata = {
  title: "Agentic AI Marketing",
  description: "Interactive Pitch: Agentic AI for Prospect Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${workSans.variable}`}>
      <body className="bg-stone-50 font-sans text-stone-900 antialiased">
        <Header />
        <main className="w-full min-h-[80vh]">{children}</main>
        <footer className="relative mt-8 w-full border-t border-stone-800 bg-stone-950 px-0 py-8 text-stone-100">
          <div className="w-full px-6 text-center">
            <h3 className="mb-2 text-xl font-bold">Questions?</h3>
            <p>© 2026 Express Analytics</p>
            <p>Contact: info@expressanalytics.com</p>
          </div>
          <div id="move-to-top-anchor" />
        </footer>
      </body>
    </html>
  );
}
