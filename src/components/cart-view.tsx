"use client";

import Link from "next/link";
import { useStore } from "@/components/store-provider";
import { formatCurrency } from "@/lib/format";

export function CartView() {
  const { cartItems, cartSubtotal, setQuantity, removeFromCart, clearCart } = useStore();

  if (!cartItems.length) {
    return (
      <section className="empty-state card">
        <h1>Tu carrito está vacío</h1>
        <p>Explora el catálogo y añade piezas premium para construir tu pedido.</p>
        <div className="empty-actions">
          <Link className="btn btn-primary" href="/catalogo">
            Ir al catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-layout">
      <div className="card">
        <div className="section-heading tight">
          <p className="eyebrow">Carrito</p>
          <h1>Revise tu selección</h1>
        </div>

        <div className="cart-list">
          {cartItems.map((item) => {
            const lineTotal = (item.product.price + item.variant.priceDelta) * item.quantity;

            return (
              <article className="cart-row" key={`${item.productSlug}-${item.variantId}`}>
                <div>
                  <h3>{item.product.name}</h3>
                  <p>
                    {item.variant.label} · {item.variant.description}
                  </p>
                </div>
                <div className="cart-controls">
                  <label className="field compact">
                    <span>Cantidad</span>
                    <input
                      type="number"
                      min={1}
                      max={item.variant.stock}
                      value={item.quantity}
                      onChange={(event) =>
                        setQuantity(item.productSlug, item.variantId, Number(event.target.value))
                      }
                    />
                  </label>
                  <strong>{formatCurrency(lineTotal)}</strong>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => removeFromCart(item.productSlug, item.variantId)}
                  >
                    Quitar
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <button className="btn btn-ghost" type="button" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>

      <aside className="card summary-card">
        <p className="eyebrow">Resumen</p>
        <h2>{formatCurrency(cartSubtotal)}</h2>
        <p className="muted">Incluye impuestos simulados y preparación estándar.</p>
        <Link className="btn btn-primary" href="/checkout">
          Continuar al checkout
        </Link>
        <Link className="btn btn-ghost" href="/catalogo">
          Seguir comprando
        </Link>
      </aside>
    </section>
  );
}
