import type { TocItem } from "@/types/blog";

export default function BlogToc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Contenido del artículo" className="card-kraft rounded-3xl p-6 lg:sticky lg:top-28">
      <p className="label-orange !text-[10px]">En este artículo</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="font-display text-ink-soft transition-colors hover:text-orange"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
