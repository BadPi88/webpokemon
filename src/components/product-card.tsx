"use client";

import Link from "next/link";
import { useStore } from "@/components/store-provider";
import { formatCurrency, discountPercent } from "@/lib/format";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isFavorite, toggleFavorite } = useStore();
  const favorite = isFavorite(product.slug);

  return (
    <article className="product-card" style={{ ["--card-a" as string]: product.palette[0], ["--card-b" as string]: product.palette[1], ["--card-c" as string]: product.palette[2] }}>
      <div className="product-card-top">
        <span className="badge">{product.category}</span>
        <button
          className={favorite ? "favorite-button active" : "favorite-button"}
          type="button"
          onClick={() => toggleFavorite(product.slug)}
          aria-label={favorite ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
        >
          ♥
        </button>
      </div>

      <Link className="product-art" href={`/productos/${product.slug}`}>
        <span className="product-art-label">{product.imageLabel}</span>
        <span className="product-art-name">{product.name}</span>
      </Link>

      <div className="product-copy">
        <p className="product-series">{product.series}</p>
        <h3>{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>
      </div>

      <div className="product-meta">
        <span>{product.score.toFixed(1)} ★ {product.reviews} reseñas</span>
        <span>Stock {product.stock}</span>
      </div>

      <div className="product-price-row">
        <div>
          <strong>{formatCurrency(product.price)}</strong>
          <small>{formatCurrency(product.compareAt)}</small>
        </div>
        <span className="discount-pill">-{discountPercent(product.price, product.compareAt)}%</span>
      </div>

      <div className="product-actions">
        <Link className="btn btn-ghost" href={`/productos/${product.slug}`}>
          Ver detalle
        </Link>
        <button className="btn btn-primary" type="button" onClick={() => addToCart(product.slug, product.variants[0]?.id)}>
          Añadir
        </button>
      </div>
    </article>
  );
}
