export default function BlogSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative max-w-md">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-soft"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar artículos"
        aria-label="Buscar artículos"
        className="font-display w-full rounded-full border bg-white/70 py-3 pr-4 pl-11 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-orange"
        style={{ borderColor: "var(--line)" }}
      />
    </div>
  );
}
