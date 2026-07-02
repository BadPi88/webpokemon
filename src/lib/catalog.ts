import { CategoryKey, Product } from "@/lib/types";

export const categories: Array<{
  key: CategoryKey;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    key: "Cartas",
    title: "Cartas premium",
    description: "Sobres, colecciones especiales y ediciones para completar tu binder.",
    accent: "Gold foil"
  },
  {
    key: "Figuras",
    title: "Figuras de vitrina",
    description: "Piezas de colección con acabados limpios y presencia de escaparate.",
    accent: "Satin finish"
  },
  {
    key: "Peluches",
    title: "Peluches deluxe",
    description: "Suaves, grandes y pensados para destacar en cualquier habitación.",
    accent: "Soft touch"
  },
  {
    key: "Accesorios",
    title: "Accesorios de trainer",
    description: "Mochilas, fundas, mousepads y piezas útiles con estilo oficial.",
    accent: "Utility set"
  },
  {
    key: "Coleccionables",
    title: "Coleccionables",
    description: "Ediciones limitadas, artículos firmados y piezas de alta demanda.",
    accent: "Limited drop"
  }
];

export const products: Product[] = [
  {
    slug: "charizard-obsidian-premium",
    name: "Charizard Obsidian Premium",
    category: "Coleccionables",
    series: "Elite Flames",
    rarity: "Legendario",
    price: 189,
    compareAt: 249,
    stock: 12,
    score: 4.9,
    reviews: 182,
    tagline: "La pieza central para una colección con presencia real.",
    description:
      "Figura de edición premium inspirada en el dragón más icónico del universo Pokémon, con acabado metálico y base numerada.",
    highlights: ["Base numerada", "Caja de exhibición", "Edición limitada"],
    badges: ["Top seller", "Exclusive"],
    palette: ["#0f172a", "#7f1d1d", "#f59e0b"],
    variants: [
      { id: "standard", label: "Standard", description: "Caja de colección + soporte", priceDelta: 0, stock: 6 },
      { id: "signed", label: "Signed", description: "Incluye tarjeta firmada de edición", priceDelta: 45, stock: 4 },
      { id: "vault", label: "Vault bundle", description: "Figura + estuche rígido + póster", priceDelta: 70, stock: 2 }
    ],
    featured: true,
    imageLabel: "Cinder vault",
    season: "Drop 2026"
  },
  {
    slug: "pikachu-lumi-collection",
    name: "Pikachu Lumi Collection",
    category: "Peluches",
    series: "Electric Hearts",
    rarity: "Especial",
    price: 64,
    compareAt: 89,
    stock: 36,
    score: 4.8,
    reviews: 421,
    tagline: "El peluche que convierte cualquier estantería en un rincón cálido.",
    description:
      "Peluche ultra suave con costuras invisibles, proporciones coleccionables y una presencia luminosa ideal para regalo.",
    highlights: ["Tela premium", "Tamaño XL", "Edición de temporada"],
    badges: ["Gift pick", "Soft touch"],
    palette: ["#1d4ed8", "#facc15", "#f8fafc"],
    variants: [
      { id: "m", label: "Medium", description: "48 cm de alto", priceDelta: 0, stock: 18 },
      { id: "l", label: "Large", description: "62 cm de alto", priceDelta: 18, stock: 10 },
      { id: "xl", label: "XL", description: "85 cm de alto", priceDelta: 38, stock: 8 }
    ],
    featured: true,
    imageLabel: "Electric plush",
    season: "Spring special"
  },
  {
    slug: "eevee-cafe-figure-set",
    name: "Eevee Cafe Figure Set",
    category: "Figuras",
    series: "Soft Morning",
    rarity: "Coleccionista",
    price: 92,
    compareAt: 119,
    stock: 24,
    score: 4.7,
    reviews: 138,
    tagline: "Una escena de vitrina con encanto y acabado editorial.",
    description:
      "Set de figura con base decorativa, accesorios temáticos y pintura suave con tonos crema y dorado.",
    highlights: ["Escena montable", "Accesorios incluidos", "Acabado mate"],
    badges: ["Display-ready", "New"],
    palette: ["#6b4f3f", "#d6c3a3", "#f5efe7"],
    variants: [
      { id: "solo", label: "Solo set", description: "Figura y base", priceDelta: 0, stock: 12 },
      { id: "scene", label: "Scene kit", description: "Figura + escena + mini props", priceDelta: 24, stock: 8 },
      { id: "gallery", label: "Gallery edition", description: "Incluye vitrina acrílica", priceDelta: 49, stock: 4 }
    ],
    featured: false,
    imageLabel: "Cafe scene",
    season: "Gallery wave"
  },
  {
    slug: "mewtwo-archive-card-box",
    name: "Mewtwo Archive Card Box",
    category: "Cartas",
    series: "Psionic Archive",
    rarity: "Ultra rara",
    price: 135,
    compareAt: 169,
    stock: 20,
    score: 4.9,
    reviews: 296,
    tagline: "Sobres y materiales para elevar tu binder sin perder elegancia.",
    description:
      "Caja archivadora con acabado rígido, separadores numerados y una selección de sobres de alto valor coleccionista.",
    highlights: ["Archivador rígido", "Señalizadores", "Sobres premium"],
    badges: ["Collector kit", "Hot drop"],
    palette: ["#1e293b", "#7c3aed", "#f8fafc"],
    variants: [
      { id: "box", label: "Box", description: "Caja archivadora base", priceDelta: 0, stock: 10 },
      { id: "plus", label: "Plus", description: "Incluye 6 sobres premium", priceDelta: 29, stock: 7 },
      { id: "max", label: "Max", description: "Caja + 12 sobres + separadores extra", priceDelta: 54, stock: 3 }
    ],
    featured: true,
    imageLabel: "Archive vault",
    season: "Collector season"
  },
  {
    slug: "gengar-night-bag",
    name: "Gengar Night Bag",
    category: "Accesorios",
    series: "Midnight Club",
    rarity: "Especial",
    price: 78,
    compareAt: 99,
    stock: 31,
    score: 4.6,
    reviews: 74,
    tagline: "Una mochila compacta con un look nocturno y discreto.",
    description:
      "Mochila urbana con compartimento acolchado, tiras reforzadas y un bordado sutil para entrenadores que quieren estilo.",
    highlights: ["Compartimento acolchado", "Bordado premium", "Resistente al uso diario"],
    badges: ["Urban", "Daily carry"],
    palette: ["#111827", "#7c2d12", "#c084fc"],
    variants: [
      { id: "city", label: "City", description: "Versión compacta", priceDelta: 0, stock: 14 },
      { id: "pro", label: "Pro", description: "Mayor capacidad y bolsillo extra", priceDelta: 20, stock: 9 },
      { id: "bundle", label: "Bundle", description: "Mochila + estuche + llavero", priceDelta: 35, stock: 8 }
    ],
    featured: false,
    imageLabel: "Night pack",
    season: "Urban drop"
  },
  {
    slug: "snorlax-rest-lounge",
    name: "Snorlax Rest Lounge",
    category: "Peluches",
    series: "Sleep Mode",
    rarity: "Clásico",
    price: 118,
    compareAt: 149,
    stock: 16,
    score: 4.8,
    reviews: 203,
    tagline: "El peluche grande que se roba la escena y el sofá.",
    description:
      "Formato lounge con relleno de alta densidad, tacto aterciopelado y una presencia perfecta para fotos.",
    highlights: ["Formato XXL", "Relleno denso", "Acabado aterciopelado"],
    badges: ["Comfort pick", "Big size"],
    palette: ["#243b53", "#4c1d95", "#cbd5e1"],
    variants: [
      { id: "soft", label: "Soft", description: "Versión tradicional", priceDelta: 0, stock: 6 },
      { id: "lounge", label: "Lounge", description: "Tamaño ampliado", priceDelta: 24, stock: 6 },
      { id: "sleep", label: "Sleep edition", description: "Incluye manta de descanso", priceDelta: 43, stock: 4 }
    ],
    featured: false,
    imageLabel: "Rest mode",
    season: "Cozy wave"
  },
  {
    slug: "lucario-ace-statue",
    name: "Lucario Ace Statue",
    category: "Figuras",
    series: "Aura Precision",
    rarity: "Premium",
    price: 144,
    compareAt: 189,
    stock: 19,
    score: 4.9,
    reviews: 117,
    tagline: "Una estatua elegante, afilada y muy fotogénica.",
    description:
      "Figura esculpida con líneas limpias, base aerodinámica y un acabado que juega con sombras azules y grafito.",
    highlights: ["Escultura precisa", "Base estable", "Look premium"],
    badges: ["Display hero", "Staff pick"],
    palette: ["#0f172a", "#2563eb", "#cbd5e1"],
    variants: [
      { id: "hero", label: "Hero", description: "Pieza individual", priceDelta: 0, stock: 10 },
      { id: "duo", label: "Duo", description: "Pieza + soporte luminoso", priceDelta: 21, stock: 6 },
      { id: "museum", label: "Museum", description: "Vitrina protectora incluida", priceDelta: 51, stock: 3 }
    ],
    featured: true,
    imageLabel: "Aura frame",
    season: "Blue archive"
  },
  {
    slug: "trainer-binder-royal",
    name: "Trainer Binder Royal",
    category: "Accesorios",
    series: "Royal Vault",
    rarity: "Coleccionista",
    price: 54,
    compareAt: 69,
    stock: 48,
    score: 4.7,
    reviews: 88,
    tagline: "El binder para proteger tus cartas con una estética de vitrina.",
    description:
      "Binder de 12 bolsillos con cierre magnético, espaciado reforzado y materiales pensados para colecciones serias.",
    highlights: ["12 bolsillos", "Cierre magnético", "Material reforzado"],
    badges: ["Binder", "New"],
    palette: ["#2f1e4d", "#b45309", "#f8fafc"],
    variants: [
      { id: "royal", label: "Royal", description: "Binder base", priceDelta: 0, stock: 24 },
      { id: "crown", label: "Crown", description: "Con separadores premium", priceDelta: 12, stock: 14 },
      { id: "vault", label: "Vault", description: "Incluye estuche protector", priceDelta: 28, stock: 10 }
    ],
    featured: false,
    imageLabel: "Royal binder",
    season: "Vault line"
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, category: CategoryKey) {
  return products.filter((product) => product.slug !== slug && product.category === category).slice(0, 3);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}
