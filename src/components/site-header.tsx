"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/store-provider";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/carrito", label: "Carrito" },
  { href: "/perfil", label: "Perfil" },
  { href: "/admin", label: "Admin" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount, favoriteCount, user } = useStore();

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">WP</span>
        <span className="brand-copy">
          <strong>WebPok</strong>
          <small>Premium Trainer Market</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <Link
            key={link.href}
            className={pathname === link.href ? "nav-link active" : "nav-link"}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="header-chip" href="/login">
          {user ? user.name.split(" ")[0] : "Entrar"}
        </Link>
        <Link className="header-chip" href="/catalogo">
          Favoritos <strong>{favoriteCount}</strong>
        </Link>
        <Link className="header-chip primary" href="/carrito">
          Carrito <strong>{cartCount}</strong>
        </Link>
      </div>
    </header>
  );
}
