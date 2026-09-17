import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface RuntimeConfig {
  // Agent & Routing
  active_agent_profile: string;
  routing_mode: string;
  enabled: boolean;
  primary_provider: string;
  secondary_provider: string;
  primary_weight: number;
  secondary_weight: number;

  // Pipeline Features
  chat_use_fallback: boolean;
  chat_use_enhancement: boolean;
  chat_use_judge: boolean;

  // Generation Parameters
  temperature: number;
  top_p: number;
  max_tokens: number;

  // Timeouts
  primary_timeout_ms: number;
  fallback_timeout_ms: number;
  enhancement_timeout_ms: number;
  judge_timeout_ms: number;

  // Provider-Specific Models
  openrouter_primary_model: string;
  openrouter_fallback_model: string;
  openrouter_enhancement_model: string;
  openrouter_judge_model: string;

  anthropic_primary_model: string;
  anthropic_fallback_model: string;
  anthropic_enhancement_model: string;
  anthropic_judge_model: string;

  // Budget & Observability
  daily_budget_usd?: number;
  monthly_budget_usd?: number;
  budget_policy: string;

  // Metadata
  version: number;
  config_source?: string;
  persistence_available?: boolean;

  // Derived fields (for backward compatibility, not editable)
  primary_model?: string;
  secondary_model?: string;
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

/**
 * Get the appropriate primary model for a given provider.
 * Never mixes providers and models.
 */
function getPrimaryModelForProvider(provider: string, config: RuntimeConfig): string {
  if (provider === "openrouter") {
    return config.openrouter_primary_model || "openrouter/free";
  }
  if (provider === "anthropic") {
    return config.anthropic_primary_model || "claude-haiku-4-5-20251001";
  }
  return "";
}

/**
 * Get the appropriate fallback model for a given provider.
 */
function getFallbackModelForProvider(provider: string, config: RuntimeConfig): string {
  if (provider === "openrouter") {
    return config.openrouter_fallback_model || "meta-llama/llama-3.1-8b-instruct:free";
  }
  if (provider === "anthropic") {
    return config.anthropic_fallback_model || "claude-sonnet-4-6";
  }
  return "";
}

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
              <p className="font-mono text-sm text-accent truncate">{getPrimaryModelForProvider(config.primary_provider, config)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Secondary</p>
              <p className="font-semibold text-foreground capitalize">{config.secondary_provider}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fallback Model</p>
              <p className="font-mono text-sm text-accent truncate">{getFallbackModelForProvider(config.secondary_provider, config)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Routing Mode</p>
              <p className="font-semibold text-foreground capitalize">{config.routing_mode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fallback</p>
              <p className="font-semibold text-foreground">{config.chat_use_fallback ? "Enabled" : "Disabled"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Config Source</p>
              <p className="font-semibold text-foreground capitalize text-xs">{config.config_source || "environment"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Persistence</p>
              <p className="font-semibold text-foreground text-xs">{config.persistence_available ? "Available" : "Unavailable"}</p>
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
                  checked={formData.chat_use_fallback || false}
                  onChange={(e) => setFormData({ ...formData, chat_use_fallback: e.target.checked })}
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
                      value={formData.primary_provider || "openrouter"}
                      onChange={(e) => setFormData({ ...formData, primary_provider: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="openrouter">OpenRouter</option>
                      <option value="anthropic">Anthropic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Active Model (Read-only)</label>
                    <div className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground text-sm font-mono">
                      {getPrimaryModelForProvider(formData.primary_provider || "openrouter", formData as RuntimeConfig)}
                    </div>
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
                      value={formData.secondary_provider || "anthropic"}
                      onChange={(e) => setFormData({ ...formData, secondary_provider: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="anthropic">Anthropic</option>
                      <option value="openrouter">OpenRouter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Active Model (Read-only)</label>
                    <div className="w-full px-4 py-2.5 bg-background/30 border border-border rounded-lg text-foreground text-sm font-mono">
                      {getFallbackModelForProvider(formData.secondary_provider || "anthropic", formData as RuntimeConfig)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generation Parameters Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">Generation & Pipeline</h2>

            <div className="space-y-5">
              {/* Temperature */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Temperature: {(formData.temperature || 0.2).toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={formData.temperature || 0.2}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Top P */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Top P: {(formData.top_p || 0.8).toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formData.top_p || 0.8}
                  onChange={(e) => setFormData({ ...formData, top_p: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Max Tokens */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={formData.max_tokens || 900}
                  onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              {/* Pipeline Features */}
              <div className="pt-4 border-t border-border/30 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.chat_use_fallback || false}
                    onChange={(e) => setFormData({ ...formData, chat_use_fallback: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-background/50 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Use Fallback</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.chat_use_enhancement || false}
                    onChange={(e) => setFormData({ ...formData, chat_use_enhancement: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-background/50 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Use Enhancement</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.chat_use_judge || false}
                    onChange={(e) => setFormData({ ...formData, chat_use_judge: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-background/50 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Use Judge</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Provider-Specific Models Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* OpenRouter Models Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">OpenRouter Models</h2>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Primary</p>
                <p className="font-mono text-accent">{formData.openrouter_primary_model || "openrouter/free"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Fallback</p>
                <p className="font-mono text-accent">{formData.openrouter_fallback_model || "meta-llama/llama-3.1-8b-instruct:free"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Enhancement</p>
                <p className="font-mono text-accent">{formData.openrouter_enhancement_model || "openrouter/free"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Judge</p>
                <p className="font-mono text-accent">{formData.openrouter_judge_model || "openrouter/free"}</p>
              </div>
            </div>
          </div>

          {/* Anthropic Models Card */}
          <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur">
            <h2 className="text-lg font-bold text-foreground mb-6">Anthropic Models</h2>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Primary</p>
                <p className="font-mono text-accent">{formData.anthropic_primary_model || "claude-haiku-4-5-20251001"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Fallback</p>
                <p className="font-mono text-accent">{formData.anthropic_fallback_model || "claude-sonnet-4-6"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Enhancement</p>
                <p className="font-mono text-accent">{formData.anthropic_enhancement_model || "claude-haiku-4-5-20251001"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Judge</p>
                <p className="font-mono text-accent">{formData.anthropic_judge_model || "claude-haiku-4-5-20251001"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget & Limits Card */}
        <div className="glass-strong rounded-3xl p-8 border border-border/30 backdrop-blur mb-8">
          <h2 className="text-lg font-bold text-foreground mb-6">Budget & Limits</h2>

          <div className="space-y-5">
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
