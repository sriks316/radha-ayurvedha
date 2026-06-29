# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run typecheck    # tsc --noEmit (run before committing)
npm run lint         # ESLint
```

Before running, copy `.env.example` to `.env.local` and fill in all variables.

## Architecture

### Tech Stack
- **Next.js 15** App Router with TypeScript
- **Tailwind CSS** with a custom `brand` amber palette (`tailwind.config.ts`)
- **Zustand** for client state (cart + zip validation) with localStorage persistence
- **NextAuth v5** (`auth.ts`) + **Okta** OIDC provider for authentication
- **Stripe** for hosted checkout (server-validated)
- **Sonner** for toast notifications

### Key Directories
| Path | Purpose |
|---|---|
| `app/(auth)/login` | Public login page — calls `signIn("okta")` |
| `app/(protected)/dashboard` | Server component, gated by `auth()` in layout |
| `app/api/checkout/route.ts` | Stripe session creation; **always re-validates zip server-side** |
| `app/api/newsletter/route.ts` | Subscribe (POST) / unsubscribe (DELETE) stub — wire up email provider |
| `store/cart.ts` | Zustand cart store (persisted) |
| `store/zip.ts` | Zustand zip store (persisted) + modal UI store (non-persisted) |
| `lib/products.ts` | Single source of truth for product definitions and Stripe prices |
| `lib/zip-codes.ts` | `ALLOWED_ZIP_CODES` array — edit this to change the delivery zone |
| `components/zip/ZipCodeGate.tsx` | Global modal; triggered via `useZipModalStore().open(callback)` |
| `components/cart/CartDrawer.tsx` | Slide-out cart; opens Stripe checkout; triggers zip gate if needed |

### Auth Flow
`middleware.ts` protects `/dashboard/*` via NextAuth `auth` export. The `(protected)/layout.tsx` also calls `auth()` server-side as a secondary guard. Okta issues the OIDC token; NextAuth manages the session cookie.

### Zip Code Gate Flow
1. User clicks **Add to Cart** or **Checkout**
2. `useZipStore().validatedZip` is checked — if null, `useZipModalStore().open(callback)` is called
3. `ZipCodeGate` modal (mounted globally in `app/layout.tsx`) renders
4. On success: `setValidatedZip(zip)` persists to localStorage, callback fires
5. `/api/checkout` re-validates zip on the server before creating a Stripe session

### Adding / Changing Products
Edit `lib/products.ts`. Each product's `price` is in **cents**. The Stripe checkout API reads directly from this file — no Stripe dashboard price IDs are required (uses `price_data`).

### Email Service (Newsletter)
`app/api/newsletter/route.ts` is a stub. The `TODO` comments show exactly where to plug in Resend, Mailchimp, or any other provider.
