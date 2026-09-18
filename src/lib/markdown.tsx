import type { ReactNode } from "react";
import { slugify } from "@/lib/blog.utils";

/**
 * Minimal, safe Markdown renderer: builds React elements directly.
 * No dangerouslySetInnerHTML, so raw HTML inside the content is never executed.
 * Supports: H2/H3, paragraphs, bold, italic, inline code, links, images,
 * unordered/ordered lists and blockquotes.
 */

type Inline = { text: string };

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(!\[[^\]]*\]\([^)\s]+\))|(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith("![")) {
      const m = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(token);
      if (m) nodes.push(<img key={key} src={m[2]} alt={m[1]} className="my-6 w-full rounded-2xl" loading="lazy" />);
    } else if (token.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (m) {
        const external = /^https?:\/\//.test(m[2]);
        nodes.push(
          <a
            key={key}
            href={m[2]}
            className="text-orange underline underline-offset-4 hover:opacity-80"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {m[1]}
          </a>,
        );
      }
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded bg-ink/8 px-1.5 py-0.5 text-[0.9em] dark:bg-ink/10">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  const used = new Map<string, number>();
  let buffer: string[] = [];
  let listItems: Inline[] = [];
  let listOrdered = false;
  let quote: string[] = [];
  let key = 0;

  const headingId = (text: string) => {
    let id = slugify(text) || "seccion";
    const seen = used.get(id) ?? 0;
    used.set(id, seen + 1);
    if (seen > 0) id = `${id}-${seen + 1}`;
    return id;
  };

  const flushParagraph = () => {
    if (!buffer.length) return;
    const text = buffer.join(" ").trim();
    buffer = [];
    if (!text) return;
    const imageOnly = /^!\[[^\]]*\]\([^)\s]+\)$/.exec(text);
    if (imageOnly) {
      out.push(<div key={`k${key++}`}>{renderInline(text, `k${key}`)}</div>);
      return;
    }
    out.push(
      <p key={`k${key++}`} className="mt-5 leading-[1.75] text-ink-soft">
        {renderInline(text, `k${key}`)}
      </p>,
    );
  };

  const flushList = () => {
    if (!listItems.length) return;
    const items = listItems;
    listItems = [];
    const Tag = listOrdered ? "ol" : "ul";
    out.push(
      <Tag
        key={`k${key++}`}
        className={`mt-5 space-y-2 pl-5 leading-[1.75] text-ink-soft ${listOrdered ? "list-decimal" : "list-disc"}`}
      >
        {items.map((it, idx) => (
          <li key={idx} className="pl-1">
            {renderInline(it.text, `k${key}-${idx}`)}
          </li>
        ))}
      </Tag>,
    );
  };

  const flushQuote = () => {
    if (!quote.length) return;
    const text = quote.join(" ").trim();
    quote = [];
    out.push(
      <blockquote
        key={`k${key++}`}
        className="mt-7 border-l-2 pl-5 text-lg leading-relaxed text-ink italic"
        style={{ borderColor: "var(--orange)" }}
      >
        {renderInline(text, `k${key}`)}
      </blockquote>,
    );
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushAll();
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const text = heading[2].replace(/\*\*/g, "").trim();
      const level = heading[1].length;
      if (level <= 2) {
        const id = headingId(text);
        out.push(
          <h2
            key={`k${key++}`}
            id={id}
            className="font-display mt-12 scroll-mt-32 text-2xl font-semibold tracking-tight text-ink md:text-3xl"
          >
            {text}
          </h2>,
        );
      } else {
        const id = headingId(text);
        out.push(
          <h3
            key={`k${key++}`}
            id={id}
            className="font-display mt-8 scroll-mt-32 text-xl font-semibold tracking-tight text-ink"
          >
            {text}
          </h3>,
        );
      }
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^>\s?/, ""));
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const ordered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || ordered) {
      flushParagraph();
      flushQuote();
      const isOrdered = Boolean(ordered);
      if (listItems.length && isOrdered !== listOrdered) flushList();
      listOrdered = isOrdered;
      listItems.push({ text: (bullet ? bullet[1] : ordered![1]).trim() });
      continue;
    }

    if (/^(-{3,}|_{3,})$/.test(line)) {
      flushAll();
      out.push(<hr key={`k${key++}`} className="mt-10 border-t" style={{ borderColor: "var(--line)" }} />);
      continue;
    }

    flushList();
    flushQuote();
    buffer.push(line);
  }

  flushAll();
  return out;
}
