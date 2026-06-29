"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cart";
import { PRODUCTS } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore();
  const image = PRODUCTS.find((p) => p.id === item.id)?.image ?? "";

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-stone-100">
        <Image
          src={image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-stone-900 leading-tight truncate">
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-stone-400 hover:text-red-500 transition-colors shrink-0"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-500">{item.weight}</p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 rounded-lg border border-stone-200 p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-medium w-5 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <p className="text-sm font-semibold text-brand-700">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
