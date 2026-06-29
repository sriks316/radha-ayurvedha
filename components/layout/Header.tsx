"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { href: "#products",   label: "Shop" },
  { href: "#recipes",    label: "Recipes" },
  { href: "#newsletter", label: "Newsletter" },
];

export function Header() {
  const { totalItems, openCart, _hasHydrated } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = _hasHydrated ? totalItems() : 0;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-stone-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-stone-900 tracking-tight">
              Radha Ayurveda
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone-600 hover:text-brand-700 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-md text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-stone-700 hover:bg-stone-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm font-medium text-stone-700 hover:text-brand-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
