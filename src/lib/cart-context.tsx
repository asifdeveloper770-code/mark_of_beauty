import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { id: string; qty: number; shade?: string };

type CartCtx = {
  items: CartItem[];
  add: (id: string, shade?: string) => void;
  remove: (id: string, shade?: string) => void;
  setQty: (id: string, qty: number, shade?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<{ product: Product; item: CartItem }>;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "mob-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const key = (i: CartItem) => `${i.id}::${i.shade ?? ""}`;
    const detailed = items
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { product, item } : null;
      })
      .filter(Boolean) as Array<{ product: Product; item: CartItem }>;

    return {
      items,
      add: (id, shade) =>
        setItems((prev) => {
          const k = key({ id, qty: 0, shade });
          const found = prev.find((p) => key(p) === k);
          if (found) return prev.map((p) => (key(p) === k ? { ...p, qty: p.qty + 1 } : p));
          return [...prev, { id, qty: 1, shade }];
        }),
      remove: (id, shade) =>
        setItems((prev) => prev.filter((p) => !(p.id === id && (p.shade ?? "") === (shade ?? "")))),
      setQty: (id, qty, shade) =>
        setItems((prev) =>
          prev
            .map((p) =>
              p.id === id && (p.shade ?? "") === (shade ?? "") ? { ...p, qty: Math.max(0, qty) } : p,
            )
            .filter((p) => p.qty > 0),
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: detailed.reduce((s, { product, item }) => s + product.price * item.qty, 0),
      detailed,
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
}
