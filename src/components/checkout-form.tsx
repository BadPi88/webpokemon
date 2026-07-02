"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store-provider";
import { formatCurrency } from "@/lib/format";

export function CheckoutForm() {
  const router = useRouter();
  const { cartItems, cartSubtotal, placeOrder, user } = useStore();
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("submitting");
    setMessage("");

    try {
      const order = await placeOrder({
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        postalCode: String(formData.get("postalCode") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        notes: String(formData.get("notes") ?? "")
      });

      setStatus("done");
      setMessage(`Pedido ${order.id} confirmado. Te llevamos el paquete en preparación.`);
      router.push("/perfil");
    } catch (error) {
      setStatus("idle");
      setMessage(error instanceof Error ? error.message : "No hemos podido completar la compra.");
    }
  }

  if (!cartItems.length) {
    return (
      <section className="empty-state card">
        <h1>No hay artículos para pagar</h1>
        <p>Primero añade productos al carrito para activar el checkout simulado.</p>
      </section>
    );
  }

  return (
    <section className="checkout-layout">
      <div className="card">
        <div className="section-heading tight">
          <p className="eyebrow">Checkout</p>
          <h1>Finaliza tu pedido</h1>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nombre</span>
            <input defaultValue={user?.name ?? ""} name="name" placeholder="Tu nombre" />
          </label>
          <label className="field">
            <span>Correo</span>
            <input defaultValue={user?.email ?? ""} name="email" placeholder="correo@webpok.es" />
          </label>
          <label className="field">
            <span>Dirección</span>
            <input name="address" placeholder="Calle, número y piso" required />
          </label>
          <label className="field">
            <span>Ciudad</span>
            <input name="city" defaultValue={user?.city ?? ""} placeholder="Madrid" required />
          </label>
          <label className="field">
            <span>Código postal</span>
            <input name="postalCode" placeholder="28001" required />
          </label>
          <label className="field">
            <span>Teléfono</span>
            <input name="phone" placeholder="+34 600 000 000" required />
          </label>
          <label className="field full">
            <span>Notas</span>
            <textarea name="notes" placeholder="Preferencia de entrega o comentario adicional" rows={4} />
          </label>

          <div className="form-actions full">
            <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Procesando..." : "Confirmar compra"}
            </button>
          </div>
        </form>
        {message ? <p className="form-message">{message}</p> : null}
      </div>

      <aside className="card summary-card">
        <p className="eyebrow">Resumen</p>
        <h2>{formatCurrency(cartSubtotal)}</h2>
        <p className="muted">{cartItems.length} artículos listos para el envío.</p>
        <div className="mini-summary">
          {cartItems.map((item) => (
            <div key={`${item.productSlug}-${item.variantId}`} className="mini-summary-row">
              <span>
                {item.product.name} <small>x{item.quantity}</small>
              </span>
              <strong>{formatCurrency((item.product.price + item.variant.priceDelta) * item.quantity)}</strong>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
