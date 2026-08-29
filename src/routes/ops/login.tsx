import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/ops/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
      {
        name: "description",
        content: "RCKT AI Control Center - Acceso administrativo",
      },
    ],
  }),
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include", // Ensure cookies are sent/received
      });

      if (response.ok) {
        // Login successful, session cookie was set by server
        // Redirect to admin dashboard
        window.location.href = "/ops/ai-control";
        return;
      }

      // Handle error responses
      if (response.status === 429) {
        setError("Demasiados intentos. Intenta en 15 minutos.");
      } else if (response.status === 401) {
        setError("Contraseña incorrecta.");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Acceso denegado");
      }
    } catch (e) {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            RCKT
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI CONTROL CENTER
          </h1>
          <p className="text-sm text-muted-foreground">
            Acceso administrativo
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Contraseña administrativa
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoFocus
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                placeholder="Ingresa la clave de acceso"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-lg font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>

            {/* Footer Info */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Área restringida · Solo personal autorizado
              </p>
            </div>
          </form>
        </div>

        {/* Branding */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground tracking-wide">
            RCKT.es — Growth Operating System
          </p>
        </div>
      </div>

      {/* Global Advisor - Still Available */}
      <div className="fixed bottom-0 right-0 pointer-events-none" />
    </div>
  );
}
