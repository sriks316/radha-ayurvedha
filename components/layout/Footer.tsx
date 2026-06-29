import Link from "next/link";
import { Leaf, Instagram, Facebook, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Radha Ayurveda
              </span>
            </div>
            <p className="text-sm text-brand-300 leading-relaxed">
              Locally made in Indiana — pure, small-batch Ayurvedic foods crafted
              with love and tradition. Rooted in ancient wisdom, made for Hoosier
              homes.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@radhaayurveda.com"
                aria-label="Email us"
                className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "#products", label: "Premium Ghee" },
                { href: "#products", label: "Ghee Cookies" },
                { href: "#recipes",  label: "Recipes" },
                { href: "#newsletter", label: "Newsletter" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about",  label: "Our Story" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms",  label: "Terms of Service" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-brand-300">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:hello@radhaayurveda.com"
                  className="hover:text-white transition-colors"
                >
                  hello@radhaayurveda.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-brand-300">
                <Phone className="w-4 h-4 shrink-0" />
                <a
                  href="tel:+13175550123"
                  className="hover:text-white transition-colors"
                >
                  (317) 555-0123
                </a>
              </li>
            </ul>

          </div>
        </div>

        <div className="mt-12 border-t border-brand-800 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-brand-500">
          <p>© {year} Radha Ayurveda. All rights reserved.</p>
          <p>Made with ♥ and ghee in Indiana</p>
        </div>
      </div>
    </footer>
  );
}
