"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store-provider";

export function AuthPanel() {
  const router = useRouter();
  const { login, register } = useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (mode === "login") {
      const response = await login(email, password);
      setMessage(response.message);

      if (response.ok) {
        router.push("/perfil");
      }

      return;
    }

    const response = await register({
      name: String(formData.get("name") ?? ""),
      email,
      password,
      favoriteCategory: "Coleccionables",
      city: String(formData.get("city") ?? "")
    });

    setMessage(response.message);

    if (response.ok) {
      router.push("/perfil");
    }
  }

  return (
    <section className="auth-layout">
      <div className="card auth-copy">
        <p className="eyebrow">Acceso</p>
        <h1>{mode === "login" ? "Entra a tu cuenta" : "Crea tu cuenta"}</h1>
        <p className="lead">
          Guarda favoritos, revisa pedidos y prepara tu perfil de coleccionista.
        </p>
        <div className="demo-credentials">
          <strong>Demo login</strong>
          <span>mika@webpok.es · pikachu123</span>
          <span>admin@webpok.es · champion123</span>
        </div>
        <button className="btn btn-ghost" type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          Cambiar a {mode === "login" ? "registro" : "inicio de sesión"}
        </button>
      </div>

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <label className="field full">
              <span>Nombre</span>
              <input name="name" placeholder="Tu nombre" required />
            </label>
          ) : null}
          <label className="field full">
            <span>Correo</span>
            <input name="email" type="email" placeholder="correo@webpok.es" required />
          </label>
          {mode === "register" ? (
            <label className="field full">
              <span>Ciudad</span>
              <input name="city" placeholder="Madrid" required />
            </label>
          ) : null}
          <label className="field full">
            <span>Contraseña</span>
            <input name="password" type="password" placeholder="••••••••" required />
          </label>
          <div className="form-actions full">
            <button className="btn btn-primary" type="submit">
              {mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </div>
        </form>
        {message ? <p className="form-message">{message}</p> : null}
      </div>
    </section>
  );
}
