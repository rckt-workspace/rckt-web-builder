import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface RuntimeConfig {
  active_agent_profile: string;
  routing_mode: string;
  primary_provider: string;
  primary_model: string;
  secondary_provider: string;
  secondary_model: string;
  primary_weight: number;
  fallback_enabled: boolean;
  max_tokens: number;
  primary_timeout_ms: number;
  fallback_timeout_ms: number;
  daily_budget_usd?: number;
  monthly_budget_usd?: number;
  budget_policy: string;
  enabled: boolean;
  version: number;
}

export const Route = createFileRoute("/ops/ai-control")({
  component: AIControlPage,
  head: () => ({
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
});

function AIControlPage() {
  const [config, setConfig] = useState<RuntimeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<RuntimeConfig>>({});

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/ai/config");
      if (response.status === 401) {
        window.location.href = "/ops/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch config");
      }

      const data = await response.json();
      setConfig(data);
      setFormData(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching config");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/admin/ai/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        window.location.href = "/ops/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to save config");
      }

      const data = await response.json();
      setConfig(data);
      setFormData(data);
      setSuccess("Configuration saved successfully");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error saving config");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/ops/login";
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading configuration...
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "6px",
          }}
        >
          {error || "Failed to load configuration"}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
            RCKT AI Control Center
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#e5e7eb",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "6px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#dcfce7",
              color: "#166534",
              borderRadius: "6px",
            }}
          >
            {success}
          </div>
        )}

        {/* Config Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {/* Routing Config */}
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>
              Routing Configuration
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Routing Mode
              </label>
              <select
                value={formData.routing_mode || "failover"}
                onChange={(e) => setFormData({ ...formData, routing_mode: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="failover">Failover</option>
                <option value="weighted">Weighted</option>
              </select>
            </div>

            {formData.routing_mode === "weighted" && (
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Primary Weight: {formData.primary_weight}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.primary_weight || 100}
                  onChange={(e) => setFormData({ ...formData, primary_weight: parseInt(e.target.value) })}
                  style={{ width: "100%" }}
                />
              </div>
            )}

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                <input
                  type="checkbox"
                  checked={formData.fallback_enabled || false}
                  onChange={(e) => setFormData({ ...formData, fallback_enabled: e.target.checked })}
                />
                Fallback Enabled
              </label>
            </div>
          </div>

          {/* Provider Config */}
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>
              Providers
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Primary Provider
              </label>
              <select
                value={formData.primary_provider || "anthropic"}
                onChange={(e) => setFormData({ ...formData, primary_provider: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="anthropic">Anthropic</option>
                <option value="openrouter">OpenRouter</option>
              </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Primary Model
              </label>
              <input
                type="text"
                value={formData.primary_model || ""}
                onChange={(e) => setFormData({ ...formData, primary_model: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Secondary Provider
              </label>
              <select
                value={formData.secondary_provider || "openrouter"}
                onChange={(e) => setFormData({ ...formData, secondary_provider: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="anthropic">Anthropic</option>
                <option value="openrouter">OpenRouter</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Secondary Model
              </label>
              <input
                type="text"
                value={formData.secondary_model || ""}
                onChange={(e) => setFormData({ ...formData, secondary_model: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Budget Config */}
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>
              Budget & Limits
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Max Tokens
              </label>
              <input
                type="number"
                value={formData.max_tokens || 1024}
                onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Daily Budget (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.daily_budget_usd || ""}
                onChange={(e) => setFormData({ ...formData, daily_budget_usd: e.target.value ? parseFloat(e.target.value) : undefined })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
                placeholder="Optional"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Budget Policy
              </label>
              <select
                value={formData.budget_policy || "warn_only"}
                onChange={(e) => setFormData({ ...formData, budget_policy: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="warn_only">Warn Only</option>
                <option value="prefer_cheaper_provider">Prefer Cheaper</option>
                <option value="fallback_only">Fallback Only</option>
                <option value="hard_stop">Hard Stop</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1f2937",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
          <button
            onClick={fetchConfig}
            disabled={loading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#e5e7eb",
              color: "#1f2937",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
