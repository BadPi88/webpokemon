"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { categories, getProductBySlug, products } from "@/lib/catalog";
import {
  calculateLineTotal,
  createOrderId,
  loadJson,
  orderTotal,
  saveJson,
  seedUserState,
  storageKeys,
  sumStoredItems,
  toPublicUser
} from "@/lib/storage";
import { CartItem, Order, ProductVariant, PublicUser, StoredCartItem, UserProfile } from "@/lib/types";

type StoreContextValue = {
  mounted: boolean;
  categories: typeof categories;
  products: typeof products;
  cartItems: CartItem[];
  favorites: string[];
  user: PublicUser | null;
  users: UserProfile[];
  orders: Order[];
  cartCount: number;
  favoriteCount: number;
  cartSubtotal: number;
  login: (email: string, password: string) => Promise<{ ok: boolean; message: string }>;
  register: (payload: Omit<UserProfile, "tier"> & { password: string }) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
  addToCart: (productSlug: string, variantId?: string, quantity?: number) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  removeFromCart: (productSlug: string, variantId: string) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  placeOrder: (payload: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    notes?: string;
  }) => Promise<Order>;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function resolveVariant(productSlug: string, variantId?: string) {
  const product = getProductBySlug(productSlug);

  if (!product) {
    return null;
  }

  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  return { product, variant };
}

function hydrateCart(items: StoredCartItem[]) {
  return items
    .map((item) => {
      const resolved = resolveVariant(item.productSlug, item.variantId);

      if (!resolved) {
        return null;
      }

      return {
        ...item,
        product: resolved.product,
        variant: resolved.variant
      } satisfies CartItem;
    })
    .filter(Boolean) as CartItem[];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [user, setUser] = useState<PublicUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const snapshot = seedUserState();
    const persistedUsers = loadJson<UserProfile[]>(storageKeys.users, snapshot.users);
    const persistedUser = loadJson<PublicUser | null>(storageKeys.user, null);
    const persistedCart = loadJson<StoredCartItem[]>(storageKeys.cart, []);
    const persistedFavorites = loadJson<string[]>(storageKeys.favorites, []);
    const persistedOrders = loadJson<Order[]>(storageKeys.orders, []);

    setUsers(persistedUsers);
    setUser(persistedUser);
    setCart(persistedCart);
    setFavorites(persistedFavorites);
    setOrders(persistedOrders);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    saveJson(storageKeys.cart, cart);
    saveJson(storageKeys.favorites, favorites);
    saveJson(storageKeys.user, user);
    saveJson(storageKeys.users, users);
    saveJson(storageKeys.orders, orders);
  }, [cart, favorites, mounted, orders, user, users]);

  const value = useMemo<StoreContextValue>(() => {
    const cartItems = hydrateCart(cart);
    const cartCount = sumStoredItems(cart);
    const cartSubtotal = cartItems.reduce(
      (total, item) => total + calculateLineTotal(item.product.price, item.variant.priceDelta, item.quantity),
      0
    );

    return {
      mounted,
      categories,
      products,
      cartItems,
      favorites,
      user,
      users,
      orders,
      cartCount,
      favoriteCount: favorites.length,
      cartSubtotal,
      login: async (email: string, password: string) => {
        const account = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

        if (!account || account.password !== password) {
          return { ok: false, message: "No hemos encontrado una cuenta con esas credenciales." };
        }

        const nextUser = toPublicUser(account);
        setUser(nextUser);
        return { ok: true, message: `Bienvenido de nuevo, ${nextUser.name}.` };
      },
      register: async (payload) => {
        const exists = users.some((candidate) => candidate.email.toLowerCase() === payload.email.toLowerCase());

        if (exists) {
          return { ok: false, message: "Ese correo ya está registrado." };
        }

        const nextAccount: UserProfile = {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          tier: "Trainer",
          favoriteCategory: payload.favoriteCategory,
          city: payload.city
        };

        const nextUsers = [nextAccount, ...users];
        setUsers(nextUsers);
        setUser(toPublicUser(nextAccount));
        return { ok: true, message: "Cuenta creada con éxito." };
      },
      logout: () => {
        setUser(null);
      },
      addToCart: (productSlug, variantId, quantity = 1) => {
        const resolved = resolveVariant(productSlug, variantId);

        if (!resolved) {
          return;
        }

        setCart((current) => {
          const index = current.findIndex(
            (item) => item.productSlug === productSlug && item.variantId === resolved.variant.id
          );

          if (index === -1) {
            return [...current, { productSlug, variantId: resolved.variant.id, quantity }];
          }

          return current.map((item, currentIndex) =>
            currentIndex === index
              ? { ...item, quantity: Math.min(item.quantity + quantity, resolved.variant.stock) }
              : item
          );
        });
      },
      setQuantity: (productSlug, variantId, quantity) => {
        setCart((current) =>
          current
            .map((item) => {
              if (item.productSlug !== productSlug || item.variantId !== variantId) {
                return item;
              }

              return { ...item, quantity: Math.max(1, Math.min(quantity, resolveVariant(productSlug, variantId)?.variant.stock ?? quantity)) };
            })
            .filter((item) => item.quantity > 0)
        );
      },
      removeFromCart: (productSlug, variantId) => {
        setCart((current) =>
          current.filter((item) => !(item.productSlug === productSlug && item.variantId === variantId))
        );
      },
      clearCart: () => {
        setCart([]);
      },
      toggleFavorite: (slug) => {
        setFavorites((current) =>
          current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current]
        );
      },
      isFavorite: (slug) => favorites.includes(slug),
      placeOrder: async (payload) => {
        const cartLines = hydrateCart(cart);

        if (!cartLines.length) {
          throw new Error("No hay productos en el carrito.");
        }

        const orderItems = cart.map((item) => ({ ...item }));
        const total = orderTotal(
          cartLines.map((item) => ({
            price: item.product.price,
            priceDelta: item.variant.priceDelta,
            quantity: item.quantity
          }))
        );

        const nextOrder: Order = {
          id: createOrderId(),
          createdAt: new Date().toISOString(),
          customer: {
            name: user?.name ?? "Cliente demo",
            email: user?.email ?? "demo@webpok.es",
            address: payload.address,
            city: payload.city,
            postalCode: payload.postalCode,
            phone: payload.phone,
            tier: user?.tier ?? "Trainer",
            favoriteCategory: user?.favoriteCategory ?? "Coleccionables"
          },
          items: orderItems,
          total,
          status: "Preparando"
        };

        try {
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nextOrder)
          });
        } catch {
          // Se mantiene la experiencia local aunque falle la API.
        }

        setOrders((current) => [nextOrder, ...current]);
        setCart([]);
        return nextOrder;
      }
    };
  }, [cart, favorites, mounted, orders, user, users]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
