import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Operamos ecommerce en varios mercados y el CAC sube cada trimestre.",
  "Tenemos varias agencias y datos inconsistentes entre canales.",
  "Queremos integrar IA en adquisición sin perder control de marca.",
  "Necesitamos medir el revenue incremental, no solo last-click.",
];

const AdvisorChat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }, []);

  const persistLead = (msgs: Msg[]) => {
    fetch("/api/save-chat-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, messages: msgs }),
    }).catch(() => {
      // silencioso: no interrumpir UX si falla el guardado
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;

    const userMsg: Msg = { role: "user", content: value };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch("/api/advisor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) {
          toast("Asesor ocupado", { description: "Demasiadas consultas. Intenta en unos segundos." });
        } else if (resp.status === 402) {
          toast("Crédito agotado", { description: "Escribe directamente al equipo de RCKT.es." });
        } else {
          toast("Error", { description: "El asesor no respondió. Intenta nuevamente." });
        }
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Guardamos la conversación completa tras cada turno (upsert por session_id)
      const finalMessages: Msg[] = assistantSoFar
        ? [...nextMessages, { role: "assistant", content: assistantSoFar }]
        : nextMessages;
      persistLead(finalMessages);
    } catch (e) {
      console.error(e);
      toast("Sin conexión", { description: "Verifica tu red e intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-strong rounded-3xl flex flex-col h-[540px] overflow-hidden">
      <header className="flex items-center justify-between px-5 py-3.5 border-b border-white/40">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
            Asesor RCKT.es · en línea
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI-first</span>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cuéntanos brevemente el reto de crecimiento de tu compañía. Te devolvemos hipótesis accionables conectadas a tu industria y a tu stack.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-[13px] leading-snug text-foreground border border-border hover:border-accent hover:bg-secondary transition-colors px-3 py-2.5 rounded-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {m.role === "user" ? "Tú" : "RCKT.es"}
            </span>
            <p
              className={
                m.role === "user"
                  ? "text-sm leading-relaxed text-foreground"
                  : "text-sm leading-relaxed text-foreground whitespace-pre-wrap border-l border-accent pl-4"
              }
            >
              {m.content}
              {isLoading && i === messages.length - 1 && m.role === "assistant" && (
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-accent align-middle animate-pulse" />
              )}
            </p>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">RCKT.es</span>
            <div className="flex gap-1 pl-4 border-l border-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:120ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:240ms]" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border p-3 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Describe el reto de crecimiento de tu compañía…"
          className="flex-1 resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none px-2 py-2 max-h-32"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="text-[12px] font-semibold bg-accent text-accent-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AdvisorChat;