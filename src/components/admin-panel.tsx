"use client";

import Link from "next/link";
import { useStore } from "@/components/store-provider";
import { formatCurrency } from "@/lib/format";

export function AdminPanel() {
  const { user, products, orders, cartCount } = useStore();
  const isAdmin = user?.email === "admin@webpok.es";

  const revenue = orders.reduce((total, order) => total + order.total, 0);
  const bestSeller = [...products].sort((left, right) => right.reviews - left.reviews)[0];

  return (
    <section className="admin-layout">
      <div className="card">
        <p className="eyebrow">Admin</p>
        <h1>Panel de control</h1>
        <p className="lead">
          Seguimiento de catálogo, pedidos y tráfico de carrito en la versión demo.
        </p>
        {!isAdmin ? (
          <div className="inline-banner">
            <strong>Acceso limitado</strong>
            <p>Inicia sesión como administrador para ver este panel completo.</p>
            <Link className="btn btn-primary" href="/login">
              Entrar como admin
            </Link>
          </div>
        ) : null}
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Productos</span>
          <strong>{products.length}</strong>
        </article>
        <article className="stat-card">
          <span>Pedidos</span>
          <strong>{orders.length}</strong>
        </article>
        <article className="stat-card">
          <span>Carrito activo</span>
          <strong>{cartCount}</strong>
        </article>
        <article className="stat-card">
          <span>Ingresos demo</span>
          <strong>{formatCurrency(revenue)}</strong>
        </article>
      </div>

      <div className="two-column">
        <div className="card">
          <div className="section-heading tight">
            <p className="eyebrow">Top pick</p>
            <h2>{bestSeller.name}</h2>
          </div>
          <p className="lead">{bestSeller.tagline}</p>
          <div className="feature-pills">
            {bestSeller.badges.map((badge) => (
              <span key={badge} className="feature-pill">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-heading tight">
            <p className="eyebrow">Pedidos recientes</p>
            <h2>Actividad</h2>
          </div>
          <div className="admin-orders">
            {orders.length ? (
              orders.slice(0, 5).map((order) => (
                <article key={order.id} className="order-card">
                  <div>
                    <strong>{order.id}</strong>
                    <p>{order.customer.name}</p>
                  </div>
                  <div>
                    <strong>{formatCurrency(order.total)}</strong>
                    <p>{order.status}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="muted">No hay pedidos registrados todavía.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
