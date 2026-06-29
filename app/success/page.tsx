import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClearCartOnSuccess } from "./ClearCartOnSuccess";

export const metadata: Metadata = { title: "Order Confirmed" };

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <ClearCartOnSuccess />
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          Thank you for your order. We&rsquo;re preparing your ghee goodness with
          love. You&rsquo;ll receive a confirmation email shortly.
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
              Shop More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
