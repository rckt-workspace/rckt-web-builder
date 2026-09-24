export default function SpainMarketMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`market-map${compact ? " market-map--compact" : ""}`}
      aria-label="Mapa simplificado de España con Madrid como mercado activo"
    >
      <svg viewBox="0 0 520 390" role="img" aria-labelledby={compact ? "spain-map-title-compact" : "spain-map-title"}>
        <title id={compact ? "spain-map-title-compact" : "spain-map-title"}>Madrid, mercado activo de RCKT en España</title>
        <path className="market-map__country" d="M72 83 116 57l58 10 43-26 67 13 47-13 35 26 65 9 31 39-18 34 16 35-28 31-2 45-53 18-33 40-72-5-49 24-49-27-56 8-20-34-46-17-15-51 26-35-11-47 32-20-8-38Z" />
        <circle className="market-map__halo" cx="278" cy="193" r="20" />
        <circle className="market-map__point" cx="278" cy="193" r="7" />
        <path className="market-map__line" d="M290 188h68" />
        <text className="market-map__label" x="368" y="194">Madrid · activo</text>
      </svg>
    </div>
  );
}