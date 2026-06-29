import { Leaf, Truck, ShieldCheck, Recycle } from "lucide-react";

const FEATURES = [
  { icon: Leaf,       title: "100% Natural",      desc: "No preservatives, additives, or artificial flavours" },
  { icon: ShieldCheck, title: "Traditional Process",  desc: "Traditional method, slow-cooked in small batches" },
  { icon: Truck,       title: "Indiana Local",      desc: "Proudly made and delivered within Indiana" },
  { icon: Recycle,     title: "Eco Packaging",     desc: "Glass jars and compostable packaging" },
];

export function TrustBar() {
  return (
    <section className="bg-brand-50 border-y border-brand-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-900 text-sm">{title}</p>
                <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
