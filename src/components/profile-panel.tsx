"use client";

import Link from "next/link";
import { useStore } from "@/components/store-provider";
import { formatCurrency, formatDate } from "@/lib/format";
import { ProductCard } from "@/components/product-card";

export function ProfilePanel() {
  const { user, orders, favorites, products, logout } = useStore();

  if (!user) {
    return (
      <section className="empty-state card">
        <h1>Inicia sesión para ver tu perfil</h1>
        <p>Tu carrito, favoritos y pedidos se muestran aquí cuando entras a tu cuenta.</p>
        <Link className="btn btn-primary" href="/login">
          Ir a acceso
        </Link>
      </section>
    );
  }

  const favoriteProducts = products.filter((product) => favorites.includes(product.slug));

  return (
    <section className="profile-layout">
      <div className="card profile-hero">
        <p className="eyebrow">Perfil</p>
        <h1>{user.name}</h1>
        <p className="lead">{user.email}</p>
        <div className="profile-meta">
          <span className="feature-pill">{user.tier}</span>
          <span className="feature-pill">Favorita: {user.favoriteCategory}</span>
          {user.city ? <span className="feature-pill">{user.city}</span> : null}
        </div>
        <button className="btn btn-ghost" type="button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="card">
        <div className="section-heading tight">
          <p className="eyebrow">Pedidos</p>
          <h2>Últimos movimientos</h2>
        </div>
        <div className="order-list">
          {orders.length ? (
            orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <strong>{formatCurrency(order.total)}</strong>
                  <p>{order.status}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">Todavía no hay pedidos en esta cuenta.</p>
          )}
        </div>
      </div>

      <div className="section">
        <div className="section-heading">
          <p className="eyebrow">Favoritos</p>
          <h2>Tu vitrina personal</h2>
        </div>
        <div className="catalog-grid compact-grid">
          {favoriteProducts.length ? (
            favoriteProducts.map((product) => <ProductCard key={product.slug} product={product} />)
          ) : (
            <div className="card empty-state">
              <p>Aún no has guardado productos. Navega el catálogo para crear tu lista.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
