import type { TocItem } from "@/types/blog";

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Headings (H2/H3) of a markdown document, for the article table of contents. */
export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Map<string, number>();

  for (const raw of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.*)$/.exec(raw.trim());
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].replace(/\*\*/g, "").trim();
    let id = slugify(text) || "seccion";
    const seen = used.get(id) ?? 0;
    used.set(id, seen + 1);
    if (seen > 0) id = `${id}-${seen + 1}`;
    items.push({ id, text, level: level as 2 | 3 });
  }

  return items;
}
