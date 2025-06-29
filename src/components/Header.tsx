"use client";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, EyeIcon, CubeIcon, Cog6ToothIcon, UsersIcon, BeakerIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "#vision", label: "Vision", icon: EyeIcon },
  { href: "#model", label: "Model", icon: CubeIcon },
  { href: "#workflow", label: "Workflow", icon: Cog6ToothIcon },
  { href: "#competitive", label: "Competitive", icon: UsersIcon },
  { href: "#prototype", label: "Prototype", icon: BeakerIcon },
  { href: "#investment", label: "Investment", icon: CurrencyDollarIcon },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center">
      <a href="#vision" className="flex items-center gap-2">
        <Image src="/ea-logo-horizontal-dark.webp" alt="Express Analytics Logo" width={180} height={40} priority />
        <span className="ml-2 text-xl font-bold text-black whitespace-nowrap">Agentic AI Marketing</span>
      </a>
      <div className="hidden md:flex space-x-8">
        {navLinks.map(link => (
          <a key={link.href} href={link.href} className="nav-link font-medium pb-1 text-black hover:text-purple-700 flex items-center gap-2">
            <link.icon className="w-5 h-5" />
            {link.label}
          </a>
        ))}
      </div>
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <Bars3Icon className="w-8 h-8 text-black" />
      </button>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end" onClick={() => setMenuOpen(false)}>
          <div className="w-72 bg-white h-full shadow-lg p-6 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image src="/ea-logo-horizontal-dark.webp" alt="Express Analytics Logo" width={140} height={32} priority />
                <span className="ml-2 text-lg font-bold text-black whitespace-nowrap">Agentic AI Marketing</span>
              </div>
              <button
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="w-8 h-8 text-black" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-lg font-medium text-black hover:text-purple-700 py-2 px-2 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <link.icon className="w-6 h-6" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
