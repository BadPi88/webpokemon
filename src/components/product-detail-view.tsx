"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/store-provider";
import { Product, ProductVariant } from "@/lib/types";
import { discountPercent, formatCurrency } from "@/lib/format";
import { ProductCard } from "@/components/product-card";

export function ProductDetailView({
  product,
  relatedProducts
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addToCart, isFavorite, toggleFavorite } = useStore();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
  const effectivePrice = product.price + (selectedVariant?.priceDelta ?? 0);
  const favorite = isFavorite(product.slug);

  return (
    <div className="detail-layout">
      <section className="detail-hero card">
        <div className="detail-art" style={{ ["--card-a" as string]: product.palette[0], ["--card-b" as string]: product.palette[1], ["--card-c" as string]: product.palette[2] }}>
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.imageLabel}</p>
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{product.series}</p>
          <h2>{product.tagline}</h2>
          <p className="lead">{product.description}</p>

          <div className="rating-row">
            <strong>{product.score.toFixed(1)} ★</strong>
            <span>{product.reviews} opiniones</span>
            <span>Stock {product.stock}</span>
          </div>

          <div className="variant-list">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                className={variantId === variant.id ? "variant-button active" : "variant-button"}
                onClick={() => setVariantId(variant.id)}
              >
                <strong>{variant.label}</strong>
                <span>{variant.description}</span>
                <small>{variant.priceDelta === 0 ? "Incluido" : `+${formatCurrency(variant.priceDelta)}`}</small>
              </button>
            ))}
          </div>

          <div className="qty-row">
            <label className="field compact">
              <span>Cantidad</span>
              <input
                type="number"
                min={1}
                max={selectedVariant?.stock ?? 1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
            <div className="price-block">
              <strong>{formatCurrency(effectivePrice)}</strong>
              <span>{formatCurrency(product.compareAt)}</span>
              <small>Ahorras {discountPercent(product.price, product.compareAt)}%</small>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary" type="button" onClick={() => addToCart(product.slug, selectedVariant?.id, quantity)}>
              Añadir al carrito
            </button>
            <button
              className={favorite ? "btn btn-ghost active" : "btn btn-ghost"}
              type="button"
              onClick={() => toggleFavorite(product.slug)}
            >
              {favorite ? "Guardado" : "Guardar"}
            </button>
            <Link className="btn btn-ghost" href="/checkout">
              Comprar ahora
            </Link>
          </div>

          <div className="feature-pills">
            {product.highlights.map((highlight) => (
              <span key={highlight} className="feature-pill">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Recomendados</p>
          <h2>Combina esta pieza con otras del mismo estilo</h2>
        </div>
        <div className="catalog-grid compact-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
