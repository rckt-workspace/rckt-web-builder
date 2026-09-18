import type { BlogCategory } from "@/types/blog";

export default function BlogCategories({
  categories,
  active,
  onChange,
}: {
  categories: BlogCategory[];
  active: string;
  onChange: (slug: string) => void;
}) {
  const items = [{ id: "all", name: "Todas", slug: "all" }, ...categories];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Categorías">
      {items.map((c) => {
        const isActive = c.slug === active;
        return (
          <button
            key={c.slug}
            type="button"
            onClick={() => onChange(c.slug)}
            aria-pressed={isActive}
            className={`font-display cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
              isActive
                ? "border-transparent bg-orange text-white"
                : "border-ink/12 text-ink-soft hover:border-orange/40 hover:text-ink"
            }`}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
