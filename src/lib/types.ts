export type CategoryKey = "Cartas" | "Figuras" | "Peluches" | "Accesorios" | "Coleccionables";

export type ProductVariant = {
  id: string;
  label: string;
  description: string;
  priceDelta: number;
  stock: number;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryKey;
  series: string;
  rarity: string;
  price: number;
  compareAt: number;
  stock: number;
  score: number;
  reviews: number;
  tagline: string;
  description: string;
  highlights: string[];
  badges: string[];
  palette: [string, string, string];
  variants: ProductVariant[];
  featured: boolean;
  imageLabel: string;
  season: string;
};

export type StoredCartItem = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

export type CartItem = StoredCartItem & {
  product: Product;
  variant: ProductVariant;
};

export type UserProfile = {
  name: string;
  email: string;
  password: string;
  tier: "Trainer" | "Elite" | "Champion";
  favoriteCategory: CategoryKey;
  city?: string;
};

export type PublicUser = Omit<UserProfile, "password">;

export type OrderStatus = "Preparando" | "Enviado" | "Entregado";

export type Order = {
  id: string;
  createdAt: string;
  customer: PublicUser & {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  items: StoredCartItem[];
  total: number;
  status: OrderStatus;
};
