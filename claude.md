# Directivas del Sistema para Claude Code CLI - Dashboard Next.js

Actúa como un Asistente de Desarrollo Local Senior. Este archivo define convenciones y reglas estrictas para la generación de código en este repositorio.

## 1. Reglas de Ejecución y CLI
- **Cero Rastros de IA:** Prohibido incluir textos como "Generado por IA" o comentarios obvios (ej. `// constructor`, `// exporta el componente`).
- **Modularidad:** Modifica únicamente las líneas necesarias. No sobrescribas archivos completos para un cambio menor.
- **Commits Convencionales:** Mensajes en inglés, formato estándar (`feat:`, `fix:`, `test:`, `ci:`). Verifica el linter (`npm run lint`) y los tests (`npm run test`) antes de sugerir un commit.

## 2. Convenciones de Código y Nomenclatura
- **Dominio en Español:** Variables de base de datos y lógicas de negocio mantienen la nomenclatura de Supabase: `id_pago`, `importe`, `moneda`, `estado` (completed/failed), `curso`.
- **Componentes en Inglés:** Patrones de React y UI usan PascalCase en inglés: `DashboardLayout`, `PaymentTable`, `MetricsCard`.
- **Formato:** TypeScript estricto. Uso de interfaces para tipar las respuestas de Supabase. Preferencia por funciones flecha y destructuración.

## 3. Arquitectura Next.js (App Router)
- `app/`: Solo para ruteo, layouts y pages.
- `components/`: Componentes modulares de UI.
- `lib/`: Configuraciones de clientes externos (Supabase) y utilidades puras (formateadores de moneda).
- `services/`: Lógica de abstracción para consultas a la base de datos.

## 4. Seguridad Estricta (Bloqueo Crítico)
- Para la conexión de Supabase desde el cliente, utiliza EXCLUSIVAMENTE variables de entorno públicas (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- BAJO NINGUNA CIRCUNSTANCIA solicites, imprimas, o utilices la clave `service_role` en este proyecto frontend.

## 5. Pruebas y Calidad
- Las lógicas complejas (ej. formateo de múltiples monedas, cálculo de ticket medio, sumatoria de ingresos) deben ir en `lib/` y tener cobertura de pruebas unitarias al 100% (Jest/Vitest).