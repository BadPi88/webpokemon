"use client";

import { useState } from "react";
import { useStore } from "@/components/store-provider";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

export function CatalogBrowser({ initialProducts }: { initialProducts: Product[] }) {
  const { categories } = useStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = initialProducts
    .filter((product) => {
      const queryTarget = `${product.name} ${product.tagline} ${product.series} ${product.category}`.toLowerCase();
      const categoryMatch = category === "Todas" || product.category === category;
      return categoryMatch && queryTarget.includes(query.toLowerCase());
    })
    .sort((left, right) => {
      if (sortBy === "price-asc") {
        return left.price - right.price;
      }

      if (sortBy === "price-desc") {
        return right.price - left.price;
      }

      if (sortBy === "stock") {
        return right.stock - left.stock;
      }

      return Number(right.featured) - Number(left.featured) || right.score - left.score;
    });

  return (
    <section className="catalog-shell">
      <div className="catalog-toolbar">
        <label className="field">
          <span>Buscar</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Charizard, binder, peluche..."
          />
        </label>

        <label className="field">
          <span>Categoría</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Todas</option>
            {categories.map((item) => (
              <option key={item.key}>{item.key}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Ordenar</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio ascendente</option>
            <option value="price-desc">Precio descendente</option>
            <option value="stock">Más stock</option>
          </select>
        </label>
      </div>

      <div className="catalog-grid">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
