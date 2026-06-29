"use client";

import { useEffect, useRef } from "react";
import { X, ShoppingBag, ArrowRight, PackageOpen } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart";
import { useZipStore, useZipModalStore } from "@/store/zip";
import { CartItem } from "./CartItem";
import { Button }   from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, totalPrice, totalItems, clearCart, _hasHydrated } = useCartStore();
  const { validatedZip }  = useZipStore();
  const { open: openZip } = useZipModalStore();
  const overlayRef        = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = async () => {
    const doCheckout = async () => {
      toast.loading("Redirecting to checkout…", { id: "checkout" });
      try {
        const res  = await fetch("/api/checkout", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items:   items.map((i) => ({ id: i.id, quantity: i.quantity })),
            zipCode: validatedZip,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Checkout failed");
        toast.dismiss("checkout");
        window.location.href = data.url;
      } catch (err: unknown) {
        toast.dismiss("checkout");
        toast.error(err instanceof Error ? err.message : "Checkout failed");
      }
    };

    if (!validatedZip) {
      openZip(doCheckout);
    } else {
      doCheckout();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <h2 className="font-serif text-lg font-semibold text-stone-900">
              Your Cart
            </h2>
            {_hasHydrated && totalItems() > 0 && (
              <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems()}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="rounded-md p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {!_hasHydrated || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <PackageOpen className="w-14 h-14 text-stone-300" />
              <div>
                <p className="font-semibold text-stone-700">Your cart is empty</p>
                <p className="text-sm text-stone-400 mt-1">
                  Add some golden goodness to get started.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Continue shopping
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {_hasHydrated && items.length > 0 && (
          <div className="border-t border-stone-100 p-5 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-stone-400 text-xs">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-stone-900 text-base pt-1">
                <span>Total</span>
                <span className="text-brand-700">{formatCurrency(totalPrice())}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Checkout
              <ArrowRight className="w-4 h-4" />
            </Button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-stone-400 hover:text-red-500 transition-colors text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
