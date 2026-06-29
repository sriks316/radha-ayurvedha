"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

/** Clears the cart when the success page mounts. */
export function ClearCartOnSuccess() {
  const clearCart = useCartStore((s) => s.clearCart);
  useEffect(() => { clearCart(); }, [clearCart]);
  return null;
}
