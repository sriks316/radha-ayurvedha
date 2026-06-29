import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ZipCodeGate } from "@/components/zip/ZipCodeGate";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Radha Ayurveda — Premium Grass-Fed Ghee & Artisan Cookies",
    template: "%s | Radha Ayurveda",
  },
  description:
    "Locally made in Indiana — small-batch, grass-fed ghee and artisan ghee cookies crafted using traditional methods. Pure. Natural. Delivered to your door.",
  keywords: ["ghee", "ayurvedic", "Indiana ghee", "grass-fed ghee", "artisan cookies", "local Indiana food"],
  openGraph: {
    type:        "website",
    siteName:    "Radha Ayurveda",
    locale:      "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D97706",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Global overlays */}
        <CartDrawer />
        <ZipCodeGate />
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            classNames: {
              toast: "font-sans",
            },
          }}
        />
      </body>
    </html>
  );
}
