import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">WebPok Premium Market</p>
        <p className="footer-text">
          Tienda demo para coleccionistas, entrenadores y fans que quieren una experiencia
          cuidada.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/catalogo">Catálogo</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/login">Acceso</Link>
      </div>
    </footer>
  );
}
