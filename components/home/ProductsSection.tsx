import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Our Products
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900">
            Crafted with Intention
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
            Every jar and every cookie is a labour of love — pure ingredients,
            zero shortcuts.
          </p>
        </div>

        {/* Product cards with alternating layout */}
        <div className="space-y-32">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
