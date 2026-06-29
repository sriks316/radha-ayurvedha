import { Phone } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-700 text-white text-sm py-2 px-4 text-center">
      <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
        <span>⚡ Want it today?</span>
        <span className="font-semibold">For same-day delivery, call or text us:</span>
        <a
          href="tel:+13175550199"
          className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-brand-200 transition-colors whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5" />
          (317) 555-0199
        </a>
      </span>
    </div>
  );
}
