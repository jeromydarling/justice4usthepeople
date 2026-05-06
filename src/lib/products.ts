// Store products. Each product has a Stripe Payment Link URL — create the
// product in your Stripe dashboard, copy the Payment Link URL, and paste it
// into the matching env var (or directly here for one-offs).
export type Product = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  inStock: boolean;
  // CSS color — used for the placeholder card art if no image is provided.
  art: string;
  imageSrc?: string; // /public path
  paymentLink: string;
  envVar: string;
};

export const products: Product[] = [
  {
    id: "yard-sign",
    name: "ICE OUT yard sign",
    price: "$35",
    blurb:
      "Heavyweight, all-weather yard sign with our two-color mark. Ships with steel H-stake. Made in Minnesota.",
    inStock: true,
    art: "linear-gradient(135deg, #1a2540 0%, #3a4d77 60%, #dc972f 60%, #e7b257 100%)",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_YARDSIGN ?? "",
    envVar: "NEXT_PUBLIC_STRIPE_YARDSIGN"
  },
  {
    id: "tshirt",
    name: "Solidarity tee",
    price: "$28",
    blurb:
      "Soft heavyweight cotton, screen-printed with the loon-and-star mark. Unisex sizes XS–3XL.",
    inStock: true,
    art: "linear-gradient(135deg, #15171c 0%, #2a2d35 70%, #dc972f 70%, #e7b257 100%)",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_TSHIRT ?? "",
    envVar: "NEXT_PUBLIC_STRIPE_TSHIRT"
  },
  {
    id: "buttons",
    name: "Button pack (5)",
    price: "$10",
    blurb:
      "Five 1.5\" buttons — for jackets, bags, lapels, and gifting. Mix of marks and slogans.",
    inStock: true,
    art: "radial-gradient(circle at 30% 30%, #dc972f, #c47c1a 60%, #1a2540)",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_BUTTON_PACK ?? "",
    envVar: "NEXT_PUBLIC_STRIPE_BUTTON_PACK"
  }
];
