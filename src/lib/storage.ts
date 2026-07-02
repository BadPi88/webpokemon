import { Order, PublicUser, StoredCartItem, UserProfile } from "@/lib/types";

export const storageKeys = {
  cart: "webpok.cart",
  favorites: "webpok.favorites",
  user: "webpok.user",
  users: "webpok.users",
  orders: "webpok.orders"
} as const;

export type AuthSnapshot = {
  user: PublicUser | null;
  users: UserProfile[];
};

export function getSeedUsers(): UserProfile[] {
  return [
    {
      name: "Mika Trainer",
      email: "mika@webpok.es",
      password: "pikachu123",
      tier: "Elite",
      favoriteCategory: "Cartas",
      city: "Madrid"
    },
    {
      name: "Ariel Admin",
      email: "admin@webpok.es",
      password: "champion123",
      tier: "Champion",
      favoriteCategory: "Coleccionables",
      city: "Barcelona"
    }
  ];
}

export function loadJson<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function toPublicUser(user: UserProfile): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}

export function seedUserState(): AuthSnapshot {
  return {
    user: null,
    users: getSeedUsers()
  };
}

export function createOrderId() {
  return `WP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function sumStoredItems(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function calculateLineTotal(price: number, delta: number, quantity: number) {
  return (price + delta) * quantity;
}

export function orderTotal(items: Array<{ price: number; priceDelta: number; quantity: number }>) {
  return items.reduce((total, item) => total + (item.price + item.priceDelta) * item.quantity, 0);
}

export function safeParseOrders(value: string | null): Order[] {
  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value) as Order[];
  } catch {
    return [];
  }
}
