import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-stone prose-headings:font-serif">
      <h1>Privacy Policy</h1>
      <p className="text-stone-500 text-sm">Last updated: {new Date().getFullYear()}</p>

      <p>
        Radha Ayurveda (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
        protecting your personal information. This Privacy Policy describes how we
        collect, use, and share information when you use our website and purchase
        our products.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect information you provide directly (name, email, shipping address,
        payment details via Stripe), information collected automatically (IP address,
        browser type, pages visited), and information from third-party services
        (Okta for authentication, Stripe for payments).
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To send transactional and marketing emails (with your consent)</li>
        <li>To verify your delivery eligibility by zip code</li>
        <li>To improve our website and services</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We share your data only with service providers necessary to operate our
        business (Stripe for payment processing, Okta for authentication). We never
        sell your personal data to third parties.
      </p>

      <h2>Cookies</h2>
      <p>
        We use strictly necessary cookies for authentication sessions and your
        shopping cart. We do not use advertising or tracking cookies.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. To
        exercise these rights, contact us at{" "}
        <a href="mailto:privacy@radhaayurveda.com">privacy@radhaayurveda.com</a>.
      </p>

      <p className="text-stone-400 text-sm mt-12">
        This is a placeholder policy. Please consult a qualified attorney before
        publishing your final privacy policy.
      </p>
    </div>
  );
}
