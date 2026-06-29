import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 sticky top-24">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {product.badge}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
                {product.tagline}
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed">
              {product.longDescription}
            </p>

            {/* Ingredients */}
            <div className="rounded-2xl border border-stone-100 overflow-hidden">
              <div className="px-4 py-3 bg-stone-50 text-sm font-semibold text-stone-700">
                Ingredients
              </div>
              <div className="px-4 py-3 bg-white">
                <ul className="space-y-1">
                  {product.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-brand-500 mt-0.5">•</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-6 pt-2">
              <div>
                <p className="text-3xl font-bold text-brand-700 font-serif">
                  {formatCurrency(product.price)}
                </p>
                <p className="text-sm text-stone-400 mt-0.5">{product.weight}</p>
              </div>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
