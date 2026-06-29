import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "premium-ghee",
    name: "Traditional Family Recipe Ghee",
    tagline: "Handcrafted. Time-Honored. Pure.",
    description:
      "A cherished family recipe passed down through generations — slow-cooked in small batches and infused with whole Ayurvedic spices. Rich, golden, and deeply aromatic.",
    longDescription:
      "This ghee is made exactly the way it has been in our family for generations — slowly simmered from cultured butter over a low flame until every drop of moisture is gone and the milk solids turn a deep, nutty gold. As it cooks, we add spices that have been part of Ayurvedic cooking for centuries, known for their warming and nourishing properties. No shortcuts, no artificial flavoring, just pure clarified butter infused with real spices the old-fashioned way. Made right here in Indiana, every jar carries the warmth of a home kitchen and the wisdom of a tradition passed down through generations.",
    ingredients: [
      "Organic grass-fed cultured butter (pasteurised milk, bacterial cultures)",
      "Whole turmeric",
      "Black pepper",
      "Curry leaves",
      "Green cardamom",
    ],
    price: 2499, // $24.99
    weight: "16 oz (454 g)",
    image:
      "/images/Traditional Ghee.png",
    badge: "Best Seller",
  },
  {
    id: "chocolate-ghee",
    name: "Chocolate Ghee with Jaggery",
    tagline: "Rich. Indulgent. Guilt-Free.",
    description:
      "Our signature ghee slow-cooked with raw cacao and unrefined jaggery — a deeply chocolatey spread that's as nourishing as it is indulgent.",
    longDescription:
      "We took our traditional family recipe ghee and did something a little unexpected — we stirred in raw cacao powder and pure jaggery, an unrefined cane sugar that Ayurveda has prized for centuries for its mineral richness and gentle sweetness. The result is a dark, velvety ghee with deep chocolate notes, a hint of caramel from the jaggery, and the same warming spice base that makes our original ghee so beloved. Spread it on warm roti, swirl it into oatmeal, or eat it straight from the jar. No refined sugar, no cocoa butter substitutes — just real ingredients made right here in Indiana.",
    ingredients: [
      "Organic grass-fed cultured butter (pasteurised milk, bacterial cultures)",
      "Raw cacao powder",
      "Unrefined jaggery",
      "Whole turmeric",
      "Green cardamom",
      "Himalayan pink salt",
    ],
    price: 2799, // $27.99
    weight: "12 oz (340 g)",
    image:
      "/images/Chocolate-ghee.png",
    badge: "New",
  },
  {
    id: "ghee-cookies",
    name: "Artisan Ghee Cookies",
    tagline: "Buttery. Crisp. Irresistible.",
    description:
      "Melt-in-your-mouth shortbread-style cookies baked with our house-made ghee, infused with cardamom, saffron, and a touch of rose water.",
    longDescription:
      "Every batch of our Ghee Cookies is baked in small runs right here in Indiana, beginning with our own house-made premium ghee, combined with organic cane sugar, stone-milled flour, and an aromatic blend of green cardamom, a pinch of saffron, and pure rose water. Inspired by traditional Indian mithai, these cookies are delicately crisp on the outside, tender at the centre, and fragrant with every bite. Each box contains 12 individually wrapped cookies — a perfect local gift or personal indulgence.",
    ingredients: [
      "House-made ghee",
      "Organic cane sugar",
      "Stone-milled whole wheat flour",
      "Green cardamom",
      "Saffron",
      "Rose water",
      "Himalayan pink salt",
    ],
    price: 1899, // $18.99
    weight: "Box of 12 cookies (300 g)",
    image:
      "/images/Cookie.png",
    badge: "New",
  },
];
