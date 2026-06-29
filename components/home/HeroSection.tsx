import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Traditional Ghee.png"
          alt="Artisan food spread"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 px-3 py-1 mb-6 backdrop-blur-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-brand-400 text-brand-400" />
            ))}
            <span className="text-brand-200 text-xs font-medium ml-1">
              Loved by Indiana families
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Pure Ghee,
            <br />
            <span className="text-brand-400">Ancient Craft</span>
          </h1>

          <p className="mt-6 text-lg text-brand-100/90 leading-relaxed max-w-md">
            Locally made in Indiana - small-batch, grass-fed ghee and artisan
            ghee cookies crafted using traditional methods passed down
            through generations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="shadow-lg shadow-brand-900/40">
              <a href="#products">
                Shop Now
                <ArrowDown className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="white">
              <a href="#recipes">
                Explore Recipes
              </a>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "", label: "Grass-Fed" },
              { value: "",    label: "No Preservatives" },
              { value: "",    label: "Minimum Ingredients" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-serif text-brand-400">
                  {stat.value}
                </div>
                <div className="text-xs text-brand-200 mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-brand-200 hover:text-white transition-colors"
        aria-label="Scroll to products"
      >
        <span className="text-xs uppercase tracking-widest">Discover</span>
        <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </a>
    </section>
  );
}
