"use client";

import { useState } from "react";
import { MapPin, Mail, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Label }   from "@/components/ui/label";
import { isZipAllowed } from "@/lib/zip-codes";
import { useZipStore, useZipModalStore } from "@/store/zip";

export function ZipCodeGate() {
  const { isOpen, pendingCallback, close } = useZipModalStore();
  const { setValidatedZip } = useZipStore();

  const [zip, setZip]                       = useState("");
  const [status, setStatus]                 = useState<"idle" | "denied">("idle");
  const [email, setEmail]                   = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleCheck = () => {
    const trimmed = zip.trim();
    if (trimmed.length < 4) {
      toast.error("Please enter a valid zip code.");
      return;
    }

    if (isZipAllowed(trimmed)) {
      setValidatedZip(trimmed);
      toast.success(`Great news! We deliver to ${trimmed}.`);
      close();
      setZip("");
      setStatus("idle");
      pendingCallback?.();
    } else {
      setStatus("denied");
    }
  };

  const handleNewsletterSignup = async () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setNewsletterSent(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setZip("");
      setStatus("idle");
      setEmail("");
      setNewsletterSent(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header band */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-6 pt-8 pb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Delivery Check
            </span>
          </div>
          <DialogTitle className="text-2xl font-serif text-white">
            Do we deliver to you?
          </DialogTitle>
          <DialogDescription className="text-brand-100 mt-1">
            Radha Ayurveda is a locally made Indiana brand. We currently deliver
            to select Indiana zip codes. Enter yours to check.
          </DialogDescription>
        </div>

        <div className="p-6 space-y-4">
          {status === "idle" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="zip">Your zip code</Label>
                <div className="flex gap-2">
                  <Input
                    id="zip"
                    placeholder="e.g. 94102"
                    maxLength={10}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  />
                  <Button onClick={handleCheck} className="shrink-0">
                    Check
                  </Button>
                </div>
              </div>
            </>
          )}

          {status === "denied" && (
            <div className="space-y-4">
              <div className="flex gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">
                    Not in our delivery zone yet
                  </p>
                  <p className="text-amber-700 text-sm mt-0.5">
                    We currently only deliver to select Indiana zip codes. Sign
                    up below and we&rsquo;ll let you know when we expand to{" "}
                    <strong>{zip}</strong>!
                  </p>
                </div>
              </div>

              {!newsletterSent ? (
                <div className="space-y-2">
                  <Label htmlFor="nl-email">Get notified when we expand</Label>
                  <div className="flex gap-2">
                    <Input
                      id="nl-email"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={handleNewsletterSignup}
                      className="shrink-0"
                    >
                      <Mail className="w-4 h-4" />
                      Notify me
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-xl p-3 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  You&rsquo;re on the list! We&rsquo;ll notify you when we expand.
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => { setStatus("idle"); setZip(""); }}
              >
                Try a different zip code
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
