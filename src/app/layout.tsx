import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-stone-900 font-sans">
        <header className="bg-white sticky top-0 z-50 shadow-sm w-full px-0">
          <Header />
        </header>
        <main className="w-full px-0 py-12 min-h-[80vh] bg-white">{children}</main>
        <footer className="bg-black text-white py-8 mt-12 border-t w-full px-0 relative">
          <div className="w-full px-6 text-center">
            <h3 className="text-xl font-bold mb-2 text-white">Questions?</h3>
            <p className="text-white">© 2025 Express Analytics</p>
            <p className="text-white">Contact: info@expressanalytics.com</p>
          </div>
          <div id="move-to-top-anchor" />
        </footer>
      </body>
    </html>
  );
}
