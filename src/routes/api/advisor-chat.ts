import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Eres un asesor estratégico senior de RCKT.es, una firma de marketing digital basada en tecnología que compite con Globant, Publicis y McKinsey.

RCKT.es construye el "Growth Operating System" de empresas que escalan: infraestructura técnica, creativa y de medición AI-first que convierte el marketing en un sistema gobernado por evidencia. No es ni agencia ni consultora.

Tu rol:
- Conversación breve, sobria, precisa. Sin hype, sin emojis, sin promesas exageradas.
- Diagnostica en pocas preguntas: industria, mercado, tamaño de operación, stack actual, fricciones de adquisición/medición/IA.
- Devuelve hipótesis accionables conectadas al Growth OS de RCKT.es (adquisición AI-first, medición incremental sobre venta real, WhatsApp Commerce, GEO+SEO, gobierno de IA).
- Tono: claridad operativa, autoridad serena. Castellano neutro.
- Respuestas cortas (máx 4 párrafos). Usa listas solo cuando aporten estructura real.
- Cuando tengas hipótesis suficientes (normalmente al 2º o 3º turno), pide al usuario sus datos de contacto corporativos para que el equipo de RCKT.es continúe la conversación: nombre, empresa, email corporativo y teléfono. Pídelos de forma sobria, en una sola frase, sin presionar. Si el usuario ya los compartió antes, no los repitas.
- Cierra invitando al siguiente paso (conversación con el equipo) cuando el contexto sea suficiente.`;

export const Route = createFileRoute("/api/advisor-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Guard contre payloads abusivos antes de parsear.
          const contentLength = Number(request.headers.get("content-length") ?? 0);
          if (contentLength > 32_000) {
            return Response.json({ error: "Payload demasiado grande." }, { status: 413 });
          }

          const { messages, session_id } = (await request.json()) as {
            messages: Array<{ role: "user" | "assistant"; content: string }>;
            session_id?: string;
          };

          if (!Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: "Mensajes inválidos." }, { status: 400 });
          }

          // Normalizamos y limitamos: máx. 50 mensajes recientes, 4000 chars c/u.
          const MAX_MESSAGES = 50;
          const MAX_CONTENT = 4000;
          const safeMessages = messages
            .filter(
              (m) =>
                m &&
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string",
            )
            .slice(-MAX_MESSAGES)
            .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT) }));

          if (safeMessages.length === 0) {
            return Response.json({ error: "Mensajes inválidos." }, { status: 400 });
          }

          const aiServiceUrl = process.env.AI_SERVICE_URL;
          const sessionId = session_id ?? undefined;

          // If AI_SERVICE_URL is configured, use rckt-ai
          if (aiServiceUrl) {
            // Add system prompt to messages
            const messagesWithSystem = [
              { role: "system", content: SYSTEM_PROMPT },
              ...safeMessages,
            ];

            // Call simple /v1/chat/completions endpoint
            const upstream = await fetch(`${aiServiceUrl}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(sessionId ? { "X-Session-Id": sessionId } : {}),
              },
              body: JSON.stringify({
                agent_profile: "rckt_advisor",
                messages: messagesWithSystem,
              }),
            });

            if (!upstream.ok) {
              if (upstream.status === 429) {
                return Response.json(
                  { error: "Demasiadas consultas. Intenta de nuevo en unos segundos." },
                  { status: 429 },
                );
              }
              if (upstream.status === 402) {
                return Response.json(
                  { error: "Crédito de IA agotado. Contacta al equipo de RCKT.es." },
                  { status: 402 },
                );
              }
              const t = await upstream.text();
              console.error("AI service error:", upstream.status, t);
              return Response.json({ error: "Error temporal del asesor." }, { status: 500 });
            }

            // Get the completed response
            const data = await upstream.json();
            const reply = data.choices?.[0]?.message?.content || "";

            // Wrap in SSE format for browser compatibility
            const sseContent =
              `data: ${JSON.stringify({ choices: [{ delta: { content: reply, role: "assistant" } }] })}\n\n` +
              `data: [DONE]\n\n`;

            return new Response(sseContent, {
              headers: { "Content-Type": "text/event-stream" },
            });
          }

          // AI_SERVICE_URL not configured — service unavailable
          console.error("AI_SERVICE_URL not configured");
          return Response.json(
            { error: "El servicio de asesor no está disponible en este momento." },
            { status: 503 },
          );
        } catch (e) {
          console.error("advisor-chat error:", e);
          return Response.json({ error: "Error temporal del asesor." }, { status: 500 });
        }
      },
    },
  },
});
