"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 admin-bg">
      <div className="w-full max-w-sm admin-card p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-admin-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SG</span>
          </div>
          <h1 className="text-2xl font-semibold text-admin-text">Acesso administrativo</h1>
          <p className="mt-1 text-sm text-admin-text-muted">Entre com suas credenciais de administrador.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="admin-form-group">
            <label htmlFor="email" className="admin-label">E-mail</label>
            <input
              type="email"
              id="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
              placeholder="admin@exemplo.com"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password" className="admin-label">Senha</label>
            <input
              type="password"
              id="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="admin-alert admin-alert-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary w-full h-10"
          >
            {loading ? (
              <>
                <svg className="admin-spinner mr-2" aria-hidden="true" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}