"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";
import { Button }  from "@/components/ui/button";
import { Badge }   from "@/components/ui/badge";
import { useCartStore }     from "@/store/cart";
import { useZipStore, useZipModalStore } from "@/store/zip";
import { formatCurrency }   from "@/lib/utils";

interface Props {
  product: Product;
  reversed?: boolean;
}

export function ProductCard({ product, reversed }: Props) {
  const { addItem, openCart }   = useCartStore();
  const { validatedZip }        = useZipStore();
  const { open: openZipModal }  = useZipModalStore();

  const handleAddToCart = () => {
    const addAndNotify = () => {
      addItem({
        id:     product.id,
        name:   product.name,
        price:  product.price,
        image:  product.image,
        weight: product.weight,
      });
      toast.success(`${product.name} added to cart!`, {
        action: { label: "View cart", onClick: openCart },
      });
    };

    if (!validatedZip) {
      openZipModal(addAndNotify);
    } else {
      addAndNotify();
    }
  };

  return (
    <div
      id={product.id}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        reversed ? "lg:[&>:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative group">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent" />
        </div>
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-brand-600 text-white text-xs px-3 py-1 shadow-lg">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
            {product.tagline}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            {product.name}
          </h2>
        </div>

        <p className="text-stone-600 text-lg leading-relaxed">
          {product.description}
        </p>

        {/* Pricing + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <p className="text-3xl font-bold text-brand-700 font-serif">
              {formatCurrency(product.price)}
            </p>
            <p className="text-sm text-stone-400 mt-0.5">{product.weight}</p>
          </div>

          <div className="sm:ml-auto flex gap-2">
            <Button asChild size="lg" variant="outline">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
            <Button size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
