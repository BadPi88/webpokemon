import { CatalogBrowser } from "@/components/catalog-browser";
import { products } from "@/lib/catalog";

export default function CatalogPage() {
  return (
    <div className="page-stack">
      <section className="section-heading page-intro">
        <p className="eyebrow">Catálogo</p>
        <h1>Explora el inventario premium</h1>
        <p className="lead">
          Filtra por categoría, ordena por precio o stock, y lleva artículos a carrito con un
          clic.
        </p>
      </section>
      <CatalogBrowser initialProducts={products} />
    </div>
  );
}
