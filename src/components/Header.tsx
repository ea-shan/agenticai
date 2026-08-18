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

function LogoMark() {
  return (
    <span className="flex h-11 items-center overflow-visible">
      <Image
        src="/EA_logo.svg"
        alt="Express Analytics"
        width={1080}
        height={420}
        priority
        unoptimized
        className="h-11 w-auto max-w-none object-contain object-left"
      />
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl border border-stone-200/80 bg-white/80 px-3 py-2 shadow-[0_20px_40px_-18px_rgba(28,25,23,0.16)] backdrop-blur-xl sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <a href="#vision" className="flex h-11 min-w-0 items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
          <LogoMark />
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium text-stone-700 transition-colors duration-200 hover:bg-violet-50 hover:text-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600 lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/30" onClick={() => setMenuOpen(false)}>
          <div
            className="flex h-full w-72 max-w-full flex-col bg-white p-5 shadow-[0_24px_60px_-20px_rgba(28,25,23,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <LogoMark />
              <button
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-7 w-7 text-stone-800" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-base font-medium text-stone-800 hover:bg-violet-50 hover:text-violet-800"
                  onClick={() => setMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
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
