import { Metadata } from "next";
import Link from "next/link";
import { XCircle, ShoppingBag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order Cancelled" };

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
          <XCircle className="w-10 h-10 text-amber-600" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">
          Payment Cancelled
        </h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          No worries — your cart is still saved. Head back whenever you&rsquo;re
          ready to complete your order.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/#products">
              <ShoppingBag className="w-4 h-4" />
              Return to Shop
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
