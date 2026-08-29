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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading configuration...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <p className="text-destructive font-medium">{error || "Failed to load configuration"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">RCKT</div>
            <h1 className="text-3xl font-bold">AI Control Center</h1>
            <p className="text-sm text-muted-foreground mt-1">Runtime orchestration</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-background/50 border border-border hover:border-accent/50 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-emerald-400 font-medium">{success}</p>
          </div>
        )}

        {/* Status Bar */}
        <div className="mb-8 glass-strong rounded-2xl p-6 border border-border/30">
          <h2 className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Runtime Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary</p>
              <p className="font-semibold text-foreground capitalize">{config.primary_provider}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary Model</p>
              <p className="font-mono text-sm text-accent truncate">{config.primary_model}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Secondary</p>
              <p className="font-semibold text-foreground capitalize">{config.secondary_provider}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Routing Mode</p>
              <p className="font-semibold text-foreground capitalize">{config.routing_mode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fallback</p>
              <p className="font-semibold text-foreground">{config.fallback_enabled ? "Enabled" : "Disabled"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Config Version</p>
              <p className="font-semibold text-foreground">v{config.version}</p>
            </div>
          </div>
        </div>

        {/* Config Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Routing Configuration Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">Routing Configuration</h2>

            <div className="space-y-5">
              {/* Routing Mode */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Routing Mode
                </label>
                <select
                  value={formData.routing_mode || "failover"}
                  onChange={(e) => setFormData({ ...formData, routing_mode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  <option value="failover">Failover</option>
                  <option value="weighted">Weighted</option>
                </select>
              </div>

              {/* Primary Weight (conditional) */}
              {formData.routing_mode === "weighted" && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    Primary Weight: {formData.primary_weight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.primary_weight || 100}
                    onChange={(e) => setFormData({ ...formData, primary_weight: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              )}

              {/* Fallback Enabled */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fallback_enabled || false}
                  onChange={(e) => setFormData({ ...formData, fallback_enabled: e.target.checked })}
                  className="w-4 h-4 rounded border-border bg-background/50 cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">Fallback Enabled</span>
              </label>
            </div>
          </div>

          {/* Provider Configuration Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">Providers</h2>

            <div className="space-y-5">
              {/* Primary Provider Section */}
              <div>
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Primary Provider</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Provider</label>
                    <select
                      value={formData.primary_provider || "anthropic"}
                      onChange={(e) => setFormData({ ...formData, primary_provider: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="anthropic">Anthropic</option>
                      <option value="openrouter">OpenRouter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Model</label>
                    <input
                      type="text"
                      value={formData.primary_model || ""}
                      onChange={(e) => setFormData({ ...formData, primary_model: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Fallback Provider Section */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Fallback Provider</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Provider</label>
                    <select
                      value={formData.secondary_provider || "openrouter"}
                      onChange={(e) => setFormData({ ...formData, secondary_provider: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="anthropic">Anthropic</option>
                      <option value="openrouter">OpenRouter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Model</label>
                    <input
                      type="text"
                      value={formData.secondary_model || ""}
                      onChange={(e) => setFormData({ ...formData, secondary_model: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Limits Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">Budget & Limits</h2>

            <div className="space-y-5">
              {/* Max Tokens */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={formData.max_tokens || 1024}
                  onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              {/* Daily Budget */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Daily Budget (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.daily_budget_usd || ""}
                  onChange={(e) => setFormData({ ...formData, daily_budget_usd: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Optional"
                />
              </div>

              {/* Budget Policy */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Budget Policy
                </label>
                <select
                  value={formData.budget_policy || "warn_only"}
                  onChange={(e) => setFormData({ ...formData, budget_policy: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  <option value="warn_only">Warn Only</option>
                  <option value="prefer_cheaper_provider">Prefer Cheaper</option>
                  <option value="fallback_only">Fallback Only</option>
                  <option value="hard_stop">Hard Stop</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
          <button
            onClick={fetchConfig}
            disabled={loading}
            className="px-6 py-3 bg-background/50 border border-border hover:border-accent/50 text-foreground font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Global Advisor Launcher - Visible but not interfering */}
      <div className="fixed bottom-0 right-0 pointer-events-none" />
    </div>
  );
}
