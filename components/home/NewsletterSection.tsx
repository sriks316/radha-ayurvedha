"use client";

import { useState } from "react";
import { Mail, CheckCircle2, BookOpen, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

const RECIPE_TEASERS = [
  {
    emoji: "🥞",
    title: "Golden Ghee Pancakes",
    desc: "Fluffy whole-wheat pancakes with a drizzle of our signature ghee.",
  },
  {
    emoji: "🍚",
    title: "Saffron Ghee Rice",
    desc: "Fragrant basmati cooked in ghee and infused with saffron threads.",
  },
  {
    emoji: "🫚",
    title: "Ayurvedic Kitchari",
    desc: "The ultimate cleansing dal-rice dish, finished with spiced ghee.",
  },
];

export function NewsletterSection() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recipes" className="bg-brand-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Recipe teasers */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-brand-400" />
              <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">
                Recipes
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Cook with Ghee.
              <br />
              <span className="text-brand-400">Live Ayurvedically.</span>
            </h2>
            <p className="text-brand-200 text-lg leading-relaxed mb-10">
              Join our community and unlock exclusive Ayurvedic recipes, seasonal
              ghee guides, and wellness tips — delivered to your inbox.
            </p>

            <div className="space-y-4">
              {RECIPE_TEASERS.map((r) => (
                <div
                  key={r.title}
                  className="flex items-start gap-4 rounded-2xl bg-brand-900/50 border border-brand-800 p-4 backdrop-blur-sm"
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{r.title}</p>
                    <p className="text-brand-300 text-sm mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Newsletter form */}
          <div
            id="newsletter"
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-brand-950/50"
          >
            {done ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  You&rsquo;re in!
                </h3>
                <p className="text-stone-500 text-sm max-w-xs">
                  Welcome to the Radha Ayurveda family. Watch your inbox for
                  recipes, ghee wisdom, and first-access offers.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-brand-600" />
                  <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                    Join the community
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">
                  Get Ghee Wisdom
                </h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                  Exclusive recipes, seasonal wellness tips, and early access to
                  new products. No spam — ever.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="newsletter-email"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Email address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    <Mail className="w-4 h-4" />
                    {loading ? "Joining…" : "Join for Free"}
                  </Button>
                </form>

                <p className="text-xs text-stone-400 mt-4 text-center">
                  We respect your privacy. Unsubscribe any time.
                </p>

                <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-3 gap-4 text-center">
                  {[
                    { n: "500+", l: "Members" },
                    { n: "12",   l: "Recipes/mo" },
                    { n: "0",    l: "Spam" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="font-bold text-brand-700 text-lg font-serif">{s.n}</p>
                      <p className="text-xs text-stone-400">{s.l}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
