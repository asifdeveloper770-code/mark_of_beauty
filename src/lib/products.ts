import lipstick from "@/assets/product-lipstick.jpg";
import serum from "@/assets/product-serum.jpg";
import blush from "@/assets/product-blush.jpg";
import perfume from "@/assets/product-perfume.jpg";
import mascara from "@/assets/product-mascara.jpg";
import cream from "@/assets/product-cream.jpg";
import highlighter from "@/assets/product-highlighter.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "Lips" | "Skin" | "Face" | "Fragrance" | "Eyes";
  image: string;
  description: string;
  ingredients: string[];
  shades?: string[];
};

export const products: Product[] = [
  {
    id: "rose-bloom-lipstick",
    name: "Rose Bloom Lipstick",
    tagline: "Velvet matte. Petal soft.",
    price: 28,
    category: "Lips",
    image: lipstick,
    description:
      "A weightless matte lipstick infused with rose hip oil and shea butter. Long-wearing pigment that nourishes lips with every kiss of color.",
    ingredients: ["Rose Hip Oil", "Shea Butter", "Vitamin E", "Jojoba Oil"],
    shades: ["Blush Peony", "Dusty Mauve", "Soft Petal", "Berry Glow"],
  },
  {
    id: "glow-serum",
    name: "Radiance Glow Serum",
    tagline: "Light captured in a drop.",
    price: 54,
    category: "Skin",
    image: serum,
    description:
      "A luminous facial serum with niacinamide and rose extract that brightens, smooths and revives tired skin overnight.",
    ingredients: ["Niacinamide 5%", "Rose Extract", "Hyaluronic Acid", "Vitamin C"],
  },
  {
    id: "petal-blush",
    name: "Petal Blush Compact",
    tagline: "A flush of grace.",
    price: 32,
    category: "Face",
    image: blush,
    description:
      "Silky-smooth powder blush that blends seamlessly into skin for a fresh, just-pinched glow.",
    ingredients: ["Mica", "Squalane", "Rose Powder"],
    shades: ["First Blush", "Sun Kissed", "Berry Cheek"],
  },
  {
    id: "grace-eau-de-parfum",
    name: "Grace Eau de Parfum",
    tagline: "Notes of faith and rose.",
    price: 89,
    category: "Fragrance",
    image: perfume,
    description:
      "An ethereal scent woven from Bulgarian rose, white peony, and warm amber — a fragrance that lingers like a quiet prayer.",
    ingredients: ["Bulgarian Rose", "White Peony", "Amber", "Vanilla Orchid"],
  },
  {
    id: "silk-primer",
    name: "Silk Veil Primer",
    tagline: "Smooth as silk. Soft as petals.",
    price: 36,
    category: "Face",
    image: mascara,
    description:
      "A featherlight primer that blurs pores and creates a flawless canvas for makeup.",
    ingredients: ["Silk Proteins", "Hyaluronic Acid", "Aloe"],
  },
  {
    id: "rose-cream",
    name: "Rose Cloud Moisturizer",
    tagline: "Drench. Plump. Glow.",
    price: 46,
    category: "Skin",
    image: cream,
    description:
      "A whipped cream moisturizer that melts into skin, leaving it bouncy, dewy and luminous.",
    ingredients: ["Rose Water", "Ceramides", "Squalane", "Peptides"],
  },
  {
    id: "halo-highlighter",
    name: "Halo Highlighter",
    tagline: "Wear your light.",
    price: 34,
    category: "Face",
    image: highlighter,
    description:
      "A pearlescent powder highlighter that catches every angle with a soft, lit-from-within glow.",
    ingredients: ["Pearl Powder", "Vitamin E", "Mica"],
    shades: ["Champagne", "Rose Gold", "Moonlight"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
