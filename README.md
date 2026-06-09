# Payment Transaction Analytics Dashboard

Dashboard analítico de pagos construido como prueba técnica para Logali Group. Visualiza transacciones desde Supabase con métricas de negocio, filtrado interactivo y tendencias de ingresos por fecha.

**Demo en producción:** [payment-transaction-analytics-dashb.vercel.app](https://payment-transaction-analytics-dashb.vercel.app)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=crd10lop_-payment-transaction-analytics-dashboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=crd10lop_-payment-transaction-analytics-dashboard)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js (App Router, React Server Components) |
| Base de datos | Supabase (PostgreSQL) |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Testing unitario | Vitest — 100% cobertura en lógica de negocio |
| Testing E2E | Playwright + axe-core (WCAG 2.1 AA) |
| Calidad de código | SonarCloud |
| CI/CD | GitHub Actions |

---

## Arquitectura

Antes de escribir la primera línea de código, diseñé una estructura de 6 fases que separara responsabilidades de forma explícita: configuración del cliente de base de datos, lógica de negocio pura, servicio de datos, componentes UI aislados, integración en la vista principal y pipeline de calidad. Esta secuencia garantizó que cada capa pudiera validarse de forma independiente.

La nomenclatura del dominio de negocio está intencionalmente en español (`calcularTicketMedio`, `PagoRegistro`, `detectarMonedaDominante`) para que el código refleje el idioma del negocio que modela, separándolo de la sintaxis técnica del framework.

---

## Enfoque en QA

Decidí ir más allá de los requisitos mínimos e implementar un ecosistema de validación técnica que refleje cómo trabajo en proyectos reales. El proyecto tiene tres capas de calidad que diseñé e integré:

**Testing unitario (TDD):** Las funciones de cálculo y formateo monetario tienen cobertura del 100% de líneas y ramas, verificada por Vitest y reportada a SonarCloud mediante LCOV. Incluí pruebas explícitas para los casos borde más críticos: división por cero en `calcularTicketMedio` y desempate alfabético en `detectarMonedaDominante`.

**Pruebas E2E funcionales:** Playwright valida el comportamiento real del dashboard en Chromium: presencia de las cuatro métricas, filtrado por ID de pago, moneda y estado, y renderizado del gráfico SVG.

**Auditoría de accesibilidad automatizada:** Integré axe-core dentro de la suite de Playwright para auditar el cumplimiento de WCAG 2.1 niveles A y AA en cada ejecución del pipeline. Las violaciones críticas bloquean la integración.

---

## Uso de IA y criterio propio

Utilicé Claude como asistente durante el desarrollo: para recordar sintaxis de Next.js App Router que no tenía presente, para generar bloques de código repetitivo y para acelerar partes de la implementación donde la lógica ya estaba clara en mi cabeza. También escribí partes del código directamente, especialmente donde necesitaba ajustar el comportamiento a lo que yo tenía pensado.

El diseño arquitectónico, la estructura de fases, las decisiones técnicas y la validación de cada resultado fueron trabajo mío. La IA ejecutó bajo mis instrucciones, no al revés.

**Lo que corregí:**

Detecté un error de tipado donde se hacía un cast ciego de la respuesta de Supabase sin mapear las columnas reales de la tabla. Identifiqué la causa directamente en la API REST e implementé el mapeo correcto.

También mantuve el alcance del proyecto bajo control: cuando el desarrollo empezaba a crecer hacia herramientas innecesarias para el objetivo de la prueba, lo corté y redirigí el foco hacia el pipeline de testing y CI/CD.

---

## Configuración local

**Requisitos:** Node.js 22+, proyecto en Supabase con tabla `pagos`.

```bash
git clone https://github.com/crd10lop/payment-transaction-analytics-dashboard.git
cd payment-transaction-analytics-dashboard
npm install
```

Crear `.env.local` en la raíz:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

```bash
npm run dev           # servidor de desarrollo en localhost:3000
npm run test          # pruebas unitarias
npm run test:coverage # pruebas unitarias con reporte de cobertura
npm run test:e2e      # pruebas E2E (requiere servidor activo)
```

---

## Referencias

- Repositorio: [github.com/crd10lop/payment-transaction-analytics-dashboard](https://github.com/crd10lop/payment-transaction-analytics-dashboard)
- Producción: [payment-transaction-analytics-dashb.vercel.app](https://payment-transaction-analytics-dashb.vercel.app)
- Análisis de calidad: [sonarcloud.io](https://sonarcloud.io/summary/new_code?id=crd10lop_-payment-transaction-analytics-dashboard)