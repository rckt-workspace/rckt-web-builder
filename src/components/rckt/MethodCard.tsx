export type MethodField = { k: string; v: string };

export default function MethodCard({ fields, className = "" }: { fields: MethodField[]; className?: string }) {
  return (
    <div className={`ficha-metodo ${className}`}>
      <span className="label-orange">Ficha del método · RCKT.es</span>
      <dl className="mt-6 grid md:grid-cols-2 md:gap-x-12">
        {fields.map((f) => (
          <div key={f.k} className="ficha-metodo__row">
            <dt className="ficha-metodo__k">{f.k}</dt>
            <dd className="ficha-metodo__v">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export const FICHA_CAPTACION: MethodField[] = [
  { k: "Situación inicial", v: "Meta o Google reportan un número de conversiones, mientras que Ventas registra otro; los comerciales atienden WhatsApp fuera del CRM y tardan más de una hora en responder." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La inversión en medios la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Mapa de fugas con tus números reales, tracking completo y campañas, WhatsApp y CRM conectados, para que cada lead tenga respuesta, seguimiento y dueño." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: coste por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

export const FICHA_ECOMMERCE: MethodField[] = [
  { k: "Situación inicial", v: "ROAS alto en la plataforma y margen bajo en el banco; creatividad agotada; WhatsApp en el proceso de venta sin medir." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas y Demand System con compromiso mínimo de 3 meses." },
  { k: "Alcance", v: "Demand System, más Sales Flow si WhatsApp pesa en la conversión." },
  { k: "Inversión", v: "La inversión en medios la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Testing creativo continuo con IA, tracking completo y lectura comercial del catálogo." },
  { k: "Resultado", v: "Margen de contribución tras adquisición, frente a la línea base firmada." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

export const FICHA_OPERACION: MethodField[] = [
  { k: "Situación inicial", v: "Presupuestos hechos a mano, datos duplicados entre CRM, ERP y hojas de cálculo, y reporting manual cada semana." },
  { k: "Periodo", v: "Operations Sprint de 6 a 8 semanas, con los criterios de aceptación firmados en la semana 2; después, soporte mensual." },
  { k: "Alcance", v: "Un proceso por sprint, con aprobación humana en lo que importa." },
  { k: "Inversión", v: "Sprint por alcance y soporte mensual durante 6 meses." },
  { k: "Intervención", v: "Mapa del proceso (volumen, tiempo, errores y coste), construcción e integración con casos reales y piloto controlado." },
  { k: "Resultado", v: "Coste por ejecución correcta, tiempo de ciclo y tasa de excepciones, frente a la línea base." },
  { k: "Método de medición", v: "Ejecuciones correctas sin intervención por encima del umbral acordado, normalmente entre el 85% y el 90% en el piloto." },
  { k: "Limitaciones", v: "Sin línea base no hay sprint. Quedan fuera los procesos sin datos accesibles o sin un responsable del lado del cliente." },
];

export const FICHA_SALUD: MethodField[] = [
  { k: "Situación inicial", v: "Seguimiento inconsistente, respuesta lenta, no-show y sin saber qué campaña trajo al paciente." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine, con Sales Flow como el componente que más pesa: respuesta, agenda y gestión de no-show." },
  { k: "Inversión", v: "La inversión en medios la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Campañas, WhatsApp y CRM conectados; recordatorios de cita y recuperación de no-show; cada paciente conectado a la campaña que lo trajo." },
  { k: "Resultado", v: "Coste por paciente que compra y % de citas realizadas, frente a la línea base." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

export const FICHA_B2B: MethodField[] = [
  { k: "Situación inicial", v: "Pipeline corto, dependencia de referidos y CRM mal usado." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine, con Demand en Google y LinkedIn y CRM con scoring." },
  { k: "Inversión", v: "La inversión en medios la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Google Search y LinkedIn selectivo, lead scoring y un pipeline que tu equipo comercial sí usa." },
  { k: "Resultado", v: "Coste por SQL y tasa de reunión a propuesta, frente a la línea base." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
