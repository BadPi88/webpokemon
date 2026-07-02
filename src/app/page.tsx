import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, getFeaturedProducts } from "@/lib/catalog";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="home-page">
      <section className="hero card">
        <div className="hero-copy">
          <p className="eyebrow">Premium collector market</p>
          <h1>Una tienda Pokémon con presencia de vitrina y alma de coleccionista.</h1>
          <p className="lead">
            Diseñada para vender, destacar y convertir: catálogo, carrito, checkout simulado,
            favoritos, cuenta y panel admin en una sola experiencia pulida.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/catalogo">
              Explorar catálogo
            </Link>
            <Link className="btn btn-ghost" href="/checkout">
              Ir al checkout
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card hero-card-large">
            <span className="badge">Drop activo</span>
            <strong>Charizard Obsidian Premium</strong>
            <p>Pieza central para una colección de alto impacto.</p>
          </div>
          <div className="hero-stats">
            <article>
              <strong>8</strong>
              <span>productos iniciales</span>
            </article>
            <article>
              <strong>5</strong>
              <span>categorías premium</span>
            </article>
            <article>
              <strong>100%</strong>
              <span>responsive</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Categorías</p>
          <h2>Una estructura clara para navegar por colección, regalo o vitrina.</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.key} className="category-card">
              <span className="badge">{category.accent}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <Link href="/catalogo">Ver colección</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Destacados</p>
          <h2>Los artículos que mejor convierten en la portada.</h2>
        </div>
        <div className="catalog-grid compact-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section split-section">
        <article className="card info-card">
          <p className="eyebrow">Checkout demo</p>
          <h2>Compra simulada sin fricción, lista para evolucionar a pago real.</h2>
          <p>
            El flujo actual permite validar la experiencia de compra, diseño y navegación antes
            de conectar una pasarela externa.
          </p>
        </article>
        <article className="card info-card">
          <p className="eyebrow">Admin</p>
          <h2>Panel básico para seguir pedidos, catálogo y actividad del carrito.</h2>
          <p>
            Perfecto para revisar rápidamente cómo se movería una tienda premium de Pokémon.
          </p>
        </article>
      </section>
    </div>
  );
}
