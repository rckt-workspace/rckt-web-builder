const inputs = [
  {
    title: "Datos y señales",
    body: "CRM, web, ads, producto y backoffice unificados en una capa común y accionable.",
  },
  {
    title: "Canales y medios",
    body: "Meta, Google, TikTok, WhatsApp, SEO, GEO y retail media orquestados como uno.",
  },
];

const outputs = [
  {
    title: "Adquisición",
    body: "CAC eficiente con medición incremental, no métricas de plataforma.",
  },
  {
    title: "Conversión",
    body: "Experiencias y mensajes que mueven el negocio, no solo el CTR.",
  },
  {
    title: "Retención",
    body: "LTV, ciclo de vida y automatización sobre comportamiento real.",
  },
];

// Curvas Bézier (viewBox 1200x640). Centro: nodo en (600, 320).
const leftPaths = [
  "M 360 170 C 470 170, 500 320, 600 320",
  "M 360 470 C 470 470, 500 320, 600 320",
];
const rightPaths = [
  "M 600 320 C 700 320, 730 130, 840 130",
  "M 600 320 C 730 320, 730 320, 840 320",
  "M 600 320 C 700 320, 730 510, 840 510",
];

const FlowDiagram = () => (
  <section className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Cómo opera</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Un sistema con entradas, núcleo y{" "}
          <span className="font-serif italic text-primary">resultados medibles</span>.
        </h2>
      </div>

      <div className="glass rounded-3xl p-6 md:p-10 overflow-hidden">
        <div className="relative">
          {/* SVG con caminos y partículas animadas */}
          <svg
            viewBox="0 0 1200 640"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {/* Trazo base de las curvas (línea pálida) */}
            {[...leftPaths, ...rightPaths].map((d, i) => (
              <path
                key={`base-${i}`}
                d={d}
                fill="none"
                stroke="#e6ebf1"
                strokeWidth="2"
              />
            ))}

            {/* Definiciones de partículas */}
            <defs>
              {[...leftPaths, ...rightPaths].map((d, i) => (
                <path key={`p-${i}`} id={`flow-path-${i}`} d={d} />
              ))}
            </defs>

            {/* Partículas viajando por cada path */}
            {[...leftPaths, ...rightPaths].map((_, pathIdx) => {
              const isLeft = pathIdx < leftPaths.length;
              const colors = isLeft
                ? ["#ff7a59", "#1f2d3d", "#ff7a59", "#7a8aa0"]
                : ["#00d4ff", "#635bff", "#00d4ff", "#7aa9ff"];
              const count = 14;
              return Array.from({ length: count }).map((__, i) => {
                const color = colors[i % colors.length];
                const dur = 6 + (i % 4) * 1.2; // 6 – 9.6s
                const begin = `-${(dur * i) / count}s`;
                const r = 2 + (i % 3) * 0.6;
                return (
                  <circle
                    key={`c-${pathIdx}-${i}`}
                    r={r}
                    fill={color}
                    opacity={0.85}
                  >
                    <animateMotion
                      dur={`${dur}s`}
                      begin={begin}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#flow-path-${pathIdx}`} />
                    </animateMotion>
                  </circle>
                );
              });
            })}

            {/* Nodo central */}
            <g>
              <rect
                x="540"
                y="260"
                width="120"
                height="120"
                rx="22"
                fill="url(#nodeGrad)"
              />
              <defs>
                <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#635bff" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
              <text
                x="600"
                y="315"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="Inter, sans-serif"
                fontWeight={700}
                fontSize="18"
                letterSpacing="-0.02em"
              >
                RCKT
              </text>
              <text
                x="600"
                y="340"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="Inter, sans-serif"
                fontWeight={500}
                fontSize="12"
                opacity={0.9}
              >
                Growth OS
              </text>
            </g>
          </svg>

          {/* Tarjetas absolutas sobre el SVG */}
          <div className="pointer-events-none absolute inset-0">
            {/* Izquierda */}
            <div className="absolute left-0 top-[4%] w-[28%]">
              <Card {...inputs[0]} />
            </div>
            <div className="absolute left-0 top-[58%] w-[28%]">
              <Card {...inputs[1]} />
            </div>
            {/* Derecha */}
            <div className="absolute right-0 top-[4%] w-[28%]">
              <Card {...outputs[0]} align="right" />
            </div>
            <div className="absolute right-0 top-[38%] w-[28%]">
              <Card {...outputs[1]} align="right" />
            </div>
            <div className="absolute right-0 top-[72%] w-[28%]">
              <Card {...outputs[2]} align="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Card = ({
  title,
  body,
  align = "left",
}: {
  title: string;
  body: string;
  align?: "left" | "right";
}) => (
  <div
    className={`bg-white rounded-2xl border border-border shadow-soft p-4 md:p-5 ${
      align === "right" ? "text-right" : ""
    }`}
  >
    <h3 className="text-[14px] md:text-[16px] font-semibold tracking-[-0.01em] mb-1">
      {title}
    </h3>
    <p className="text-[11.5px] md:text-[13px] text-muted-foreground leading-snug">
      {body}
    </p>
  </div>
);

export default FlowDiagram;