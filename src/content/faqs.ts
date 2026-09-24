import type { FaqItem } from "@/components/rckt/FaqSection";

export const REVENUE_DIAGNOSTIC_FAQS: FaqItem[] = [
  { question: "¿Es gratis?", answer: "No. Es trabajo real de tres semanas con tus datos, y se descuenta del sistema si sigues con nosotros." },
  { question: "¿Cuánto dura?", answer: "2–3 semanas." },
  { question: "¿Qué pasa después?", answer: "Recomendamos sistema o bundle según la fuga con mayor impacto económico." },
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté tu fuga — eso es justo lo que mide el Diagnostic. No damos precio de sistema sin diagnóstico." },
  { question: "¿Por qué necesitáis tanto acceso a mis datos?", answer: "Porque sin ellos no podemos medir hasta la venta. Los accesos son de lectura donde se puede y quedan documentados." },
  { question: "¿Puedo pagar solo por resultados?", answer: "Trabajamos con una parte variable, pero después de 90 días con línea base, porque antes nadie sabe qué es un resultado. Nunca cobramos 100% variable cuando el cierre depende de tu equipo, tu stock o tus precios." },
];

export const DEMAND_SYSTEM_FAQS: FaqItem[] = [
  { question: "¿Podéis gestionar solo mis campañas?", answer: "Sí, si ya tienes CRM y proceso comercial funcionando. Si no, pagarías leads que se pierden después. Por eso empezamos con el Revenue Diagnostic: te dice con datos qué necesitas." },
  { question: "Mi agencia actual me da leads a la mitad de precio.", answer: "¿Y cuántos de esos leads compran? Si no lo sabes, ese es el problema, no el precio del lead. Optimizamos por venta, no por lead, y por eso el coste por lead puede ser mayor." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "3 meses. La media se paga aparte, en tus propias cuentas publicitarias." },
  { question: "¿Qué necesitáis de mí para empezar?", answer: "Acceso de administrador a tus cuentas publicitarias, GTM y GA4, aprobación de creatividades en menos de 48 horas y acceso a los datos de ventas para cerrar el ciclo." },
  { question: "¿Cuándo está funcionando?", answer: "En un máximo de 21 días: tracking validado de extremo a extremo, estructura de campañas activa y primer reporte por etapa entregado." },
];

export const SALES_FLOW_FAQS: FaqItem[] = [
  { question: "¿Tengo que cambiar de CRM?", answer: "No necesariamente. Tu CRM es la fuente de verdad: lo configuramos y lo conectamos, no lo sustituimos por una herramienta nuestra. Si no tienes uno, te recomendamos uno y migramos si hace falta." },
  { question: "¿Un agente de IA puede cerrar ventas por mí?", answer: "No. Los agentes hacen la primera respuesta, la calificación, la agenda y las preguntas frecuentes, pero un agente nunca cierra una venta ni promete condiciones sin aprobación humana." },
  { question: "¿Quién paga las licencias de CRM y WhatsApp API?", answer: "Tú. Las licencias de CRM y de WhatsApp Business API no están incluidas en Sales Flow." },
  { question: "¿Qué necesitáis de mí?", answer: "Un número de WhatsApp Business API verificado, un CRM, un equipo comercial con un responsable nombrado, un acuerdo de SLAs internos y acceso a los datos de ventas." },
  { question: "¿Cuánto tarda en estar listo?", answer: "El sistema queda aceptado en un máximo de 30 días desde el inicio del setup, con el flujo probado con leads reales y el 100% de los leads entrando al CRM con su origen." },
];

export const OPERATIONS_SYSTEM_FAQS: FaqItem[] = [
  { question: "¿Hacéis chatbots con IA?", answer: "No vendemos chatbots. Si tu equipo repite un proceso muchas veces, lo medimos y lo automatizamos con supervisión humana." },
  { question: "¿Cuánto dura?", answer: "Un Operations Sprint de 6 a 8 semanas, con los criterios de aceptación firmados en la semana 2, y después soporte mensual." },
  { question: "¿Qué pasa si el proceso no mejora?", answer: "Medimos cuánto te cuesta el proceso hoy y lo comparamos en el piloto. Si no baja el coste por ejecución, no seguimos." },
  { question: "¿Dependéis de un proveedor de IA concreto?", answer: "No. Podemos cambiar el proveedor de IA sin rehacer el sistema: nuestro activo es el diseño del proceso, no la herramienta." },
  { question: "¿Qué necesitáis de mí?", answer: "Un dueño del proceso nombrado, acceso a los sistemas y datos, casos históricos para las pruebas y disponibilidad para validar durante el piloto." },
];

export const REVENUE_ENGINE_FAQS: FaqItem[] = [
  { question: "Quiero todo desde el principio.", answer: "Growth OS es para cuentas que ya llevan tiempo con nosotros. Empezar por todo a la vez es la forma más rápida de no medir nada: empezamos por Revenue Engine y crecemos con evidencia." },
  { question: "¿Por qué sois más caros que otros?", answer: "Comparado con una agencia de medios, sí. Comparado con pagar campañas, web, CRM, chatbot y consultor por separado sin que nadie responda por el resultado, no. Y el Revenue Diagnostic te dice si el sistema se paga solo antes de comprometerte." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "6 meses. El sistema necesita un ciclo completo para demostrar." },
  { question: "¿Qué veré y cuándo?", answer: "El día 30, el sistema operativo con su fuente de verdad. El día 90, la revisión de la línea base frente al resultado." },
  { question: "¿Me garantizáis resultados?", answer: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales y que cada decisión estará medida hasta la venta." },
];

export const CAPTACION_FAQS: FaqItem[] = [
  { question: "¿Qué sistema necesito si pago por leads y no sé cuáles compran?", answer: "Normalmente Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre. Lo confirmamos con datos en el Revenue Diagnostic." },
  { question: "¿El diagnóstico es gratis?", answer: "No. Es trabajo real de tres semanas con tus datos, y se descuenta del sistema si sigues con nosotros." },
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté tu fuga, y eso es justo lo que mide el Revenue Diagnostic. No damos precio de un sistema sin diagnóstico." },
  { question: "Mi agencia actual me da leads a la mitad de precio.", answer: "¿Y cuántos de esos leads compran? Optimizamos por venta, no por lead, y por eso el coste por lead puede ser mayor." },
  { question: "¿Me garantizáis resultados?", answer: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

export const ECOMMERCE_RENTABLE_FAQS: FaqItem[] = [
  { question: "¿Por qué no medís solo el ROAS?", answer: "Porque un ROAS alto en la plataforma puede convivir con un margen bajo en el banco. Medimos por margen de contribución tras adquisición." },
  { question: "¿Qué sistema necesita mi tienda?", answer: "Demand System, con Sales Flow si WhatsApp pesa en tu conversión. Lo decidimos con datos en el Revenue Diagnostic." },
  { question: "Vendo también por WhatsApp, ¿eso se mide?", answer: "Sí. Si WhatsApp entra en tu proceso de venta, se integra al embudo con Sales Flow para que esas ventas también se atribuyan." },
  { question: "¿Podéis gestionar solo mis campañas?", answer: "Sí, si ya tienes CRM y proceso comercial funcionando. Si no, pagarías leads que se pierden después. Empezamos por el Revenue Diagnostic y te decimos con datos qué necesitas." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "3 meses de Demand System, con la media pagada aparte en tus propias cuentas." },
];

export const OPERACION_FAQS: FaqItem[] = [
  { question: "¿Hacéis chatbots con IA?", answer: "No vendemos chatbots. Si tu equipo repite un proceso muchas veces, lo medimos y lo automatizamos con supervisión humana." },
  { question: "¿Qué procesos automatizáis?", answer: "Presupuestos desde WhatsApp o correo, clasificación y respuesta de solicitudes, generación y verificación de documentos, sincronización CRM ↔ ERP u hojas, reporting comercial y atención post-venta de primer nivel. Si tu proceso no está en esta lista, se evalúa antes de presupuestar." },
  { question: "¿Cuánto tarda?", answer: "Un Sprint de 6 a 8 semanas por proceso: un proceso por sprint, y el segundo reutiliza la infraestructura del primero." },
  { question: "¿Qué pasa con los casos que el sistema no resuelve?", answer: "Toda excepción tiene una ruta humana definida. Una persona aprueba lo que importa: envíos, condiciones especiales, firmas y reclamaciones." },
  { question: "¿Y si no sé cuánto me cuesta el proceso hoy?", answer: "Sin línea base no hay sprint: si no sabes cuánto te cuesta el proceso hoy, el Revenue Diagnostic lo mide primero." },
];

export const SALUD_FAQS: FaqItem[] = [
  { question: "¿Funciona si atendemos a los pacientes por WhatsApp?", answer: "Sí. Sales Flow conecta tus campañas, WhatsApp Business API y tu CRM para que cada paciente tenga respuesta, seguimiento y dueño." },
  { question: "¿Cómo reducís el no-show?", answer: "Con recordatorios de cita y secuencias de seguimiento y recuperación dentro de Sales Flow." },
  { question: "¿Cómo sé qué campaña me trae pacientes?", answer: "Cada paciente entra al CRM con su origen, y las etapas vuelven a Meta y Google como conversiones offline." },
  { question: "¿Un agente de IA responde a mis pacientes?", answer: "Puede hacer la primera respuesta, la calificación, la agenda y las preguntas frecuentes, siempre con aprobación humana en las decisiones de venta." },
  { question: "¿Qué indicadores medís?", answer: "Coste por paciente que compra y porcentaje de citas realizadas." },
];

export const SERVICIOS_B2B_FAQS: FaqItem[] = [
  { question: "¿Trabajáis con LinkedIn?", answer: "Sí. Usamos LinkedIn de forma selectiva para B2B, junto con Google Search, dentro de Demand System." },
  { question: "¿Cómo medís los resultados?", answer: "Por coste por SQL y por la tasa de reunión a propuesta, no por coste por lead." },
  { question: "¿Qué es un SQL?", answer: "Una oportunidad que tu equipo de ventas acepta como real. Es la unidad con la que optimizamos, no el lead." },
  { question: "Tenemos CRM, pero el equipo no lo usa. ¿Sirve igual?", answer: "Sí. Configuramos o limpiamos el pipeline, las etapas, los campos y los dashboards, con definiciones comunes de MQL, SQL, oportunidad y venta." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "6 meses de Revenue Engine, porque el sistema necesita un ciclo completo para demostrar." },
];