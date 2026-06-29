import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-stone prose-headings:font-serif">
      <h1>Terms of Service</h1>
      <p className="text-stone-500 text-sm">Last updated: {new Date().getFullYear()}</p>

      <p>
        By accessing or using the Radha Ayurveda website (radhaayurveda.com), you
        agree to be bound by these Terms of Service. Please read them carefully.
      </p>

      <h2>Products & Orders</h2>
      <p>
        All products are subject to availability. We reserve the right to limit
        quantities. Prices are in USD and subject to change without notice. Orders
        are confirmed only after payment is successfully processed via Stripe.
      </p>

      <h2>Delivery Zone</h2>
      <p>
        We currently deliver only to select zip codes in our local area. By providing
        your zip code, you confirm that your delivery address falls within our
        service area.
      </p>

      <h2>Returns & Refunds</h2>
      <p>
        Due to the perishable nature of our products, we do not accept returns.
        If you receive a damaged or incorrect order, please contact us within 48
        hours of delivery at{" "}
        <a href="mailto:hello@radhaayurveda.com">hello@radhaayurveda.com</a>.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — including text, images, and recipes — is the
        property of Radha Ayurveda and may not be reproduced without written
        permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Radha Ayurveda shall not be liable
        for any indirect, incidental, or consequential damages arising from your use
        of our products or website.
      </p>

      <p className="text-stone-400 text-sm mt-12">
        This is a placeholder terms document. Please consult a qualified attorney
        before publishing your final terms of service.
      </p>
    </div>
  );
}
