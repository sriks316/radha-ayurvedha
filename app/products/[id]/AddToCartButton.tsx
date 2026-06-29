"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useZipStore, useZipModalStore } from "@/store/zip";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore();
  const { validatedZip } = useZipStore();
  const { open: openZipModal } = useZipModalStore();

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
    <Button size="lg" onClick={handleAddToCart} className="flex-1">
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
  );
}
