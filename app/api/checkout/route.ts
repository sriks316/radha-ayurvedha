import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isZipAllowed } from "@/lib/zip-codes";
import { PRODUCTS }     from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

interface LineItemRequest {
  id:       string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, zipCode } = body as {
      items:   LineItemRequest[];
      zipCode: string;
    };

    // ── 1. Server-side zip code validation (never trust client alone) ────────
    if (!zipCode || !isZipAllowed(zipCode)) {
      return NextResponse.json(
        { error: "Delivery is not available for this zip code." },
        { status: 400 }
      );
    }

    // ── 2. Validate items and build Stripe line items ────────────────────────
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        if (!product) {
          throw new Error(`Unknown product: ${item.id}`);
        }
        if (item.quantity < 1 || item.quantity > 20) {
          throw new Error(`Invalid quantity for ${product.name}`);
        }

        return {
          price_data: {
            currency:     "usd",
            unit_amount:  product.price,
            product_data: {
              name:        product.name,
              description: product.description,
              images:      product.image.startsWith("http") ? [product.image] : [],
            },
          },
          quantity: item.quantity,
        };
      }
    );

    // ── 3. Create Stripe Checkout Session ────────────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items:           lineItems,
      mode:                 "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      metadata: { zipCode },
      custom_text: {
        submit: {
          message: "We'll only ship to the zip code you verified.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
