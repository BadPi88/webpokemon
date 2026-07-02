import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card empty-state">
      <p className="eyebrow">404</p>
      <h1>No encontramos esa ruta</h1>
      <p>Vuelve al inicio o abre el catálogo para seguir explorando la tienda.</p>
      <Link className="btn btn-primary" href="/">
        Ir al inicio
      </Link>
    </section>
  );
}
