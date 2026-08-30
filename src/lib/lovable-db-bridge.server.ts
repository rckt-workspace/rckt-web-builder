/**
 * Lovable Database Bridge - Server-side Only
 *
 * Communicates with Lovable/Supabase Edge Function (rckt-ai-db) to persist data.
 * This module uses X-RCKT-Internal-Secret header for authorization.
 *
 * NEVER expose this file or RCKT_INTERNAL_SECRET to the browser.
 * Only use in server-side routes or loaders.
 */

export interface BridgeResponse<T = any> {
  ok: boolean;
  error?: string;
  data?: T;
  persisted?: boolean;
}

class LovableBridge {
  private bridgeUrl: string;
  private internalSecret: string;

  constructor() {
    this.bridgeUrl =
      process.env.LOVABLE_DB_BRIDGE_URL ||
      process.env.SUPABASE_FUNCTIONS_URL ||
      "";
    this.internalSecret = process.env.RCKT_INTERNAL_SECRET || "";

    if (!this.bridgeUrl) {
      console.warn("LOVABLE_DB_BRIDGE_URL not configured");
    }
    if (!this.internalSecret) {
      console.warn("RCKT_INTERNAL_SECRET not configured");
    }
  }

  private async call<T>(
    action: string,
    payload?: Record<string, any>
  ): Promise<BridgeResponse<T>> {
    if (!this.bridgeUrl || !this.internalSecret) {
      return {
        ok: false,
        error: "Bridge not configured",
      };
    }

    try {
      const response = await fetch(this.bridgeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RCKT-Internal-Secret": this.internalSecret,
        },
        body: JSON.stringify({
          action,
          payload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`Bridge error (${action}):`, data);
        return {
          ok: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        ok: true,
        data,
      };
    } catch (e) {
      console.error(`Bridge exception (${action}):`, e);
      return {
        ok: false,
        error: String(e),
      };
    }
  }

  /**
   * Get current AI runtime configuration from Lovable.
   */
  async getConfig() {
    return this.call("get_config");
  }

  /**
   * Update AI runtime configuration in Lovable.
   */
  async updateConfig(config_id: string, updates: Record<string, any>) {
    return this.call("update_config", { config_id, updates });
  }

  /**
   * Record LLM usage event in Lovable.
   */
  async recordUsage(payload: {
    provider: string;
    model: string;
    tokens_used: number;
    cost_usd: number;
    request_duration_ms: number;
  }) {
    return this.call("record_usage", payload);
  }

  /**
   * Get usage statistics from Lovable.
   */
  async getUsage(period?: "day" | "week" | "month") {
    return this.call("get_usage", { period });
  }

  /**
   * Save chat lead in Lovable (upsert by session_id).
   */
  async saveChatLead(payload: {
    session_id: string;
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    name: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
    user_agent: string | null;
  }) {
    return this.call("save_chat_lead", payload);
  }

  /**
   * Save lead in Lovable.
   */
  async saveLead(payload: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
  }) {
    return this.call("save_lead", payload);
  }

  /**
   * Check if bridge is available (basic connectivity test).
   */
  isAvailable(): boolean {
    return !!(this.bridgeUrl && this.internalSecret);
  }
}

// Export singleton instance
export const lovableBridge = new LovableBridge();
