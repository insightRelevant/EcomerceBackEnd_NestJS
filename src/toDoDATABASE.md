# 🛠️ Base de Datos – Plan de Optimización (NestJS + MySQL + TypeORM)

**Contexto:**  
Este documento resume las acciones técnicas necesarias para optimizar la base de datos de una aplicación modular estructurada con `NestJS`, utilizando `MySQL` como motor relacional y `TypeORM` como ORM principal.

El análisis se basa en el estado actual del código fuente (`/src/app`), que presenta una estructura limpia y organizada por dominios (`products`, `reviews`, `tags`, `user`, etc.), y un sistema de `seed` bien implementado. A pesar de esta solidez en desarrollo, se detectaron áreas críticas a mejorar para escalar hacia producción.

---

## 🧩 1. Implementación de Índices

**Situación actual:**  
Ninguna entidad define explícitamente índices, lo que impacta negativamente en el rendimiento de búsquedas y relaciones.

**Recomendaciones:**
- Agregar índices en campos clave:
  - `Review.productId`: mejora búsquedas por producto.
  - `Product.price`: optimiza filtros por rango de precio.
  - `User.email`: fundamental para autenticación.
- Definir índices compuestos en patrones frecuentes de consulta (ej: `reviewerId + productId`).

---

## 🕸️ 2. Optimización de Consultas

**Diagnóstico:**  
Algunas consultas cargan grandes volúmenes de datos para luego filtrar en memoria, o ejecutan múltiples queries redundantes.

**Acciones sugeridas:**
- Evitar consultas N+1: usar joins explícitos o `relations`.
- Reemplazar filtrado en memoria con filtros SQL (`WHERE`, `IN`, `LIKE`, etc.).
- Fusionar múltiples validaciones consecutivas en una única consulta estructurada.

---

## ⚙️ 3. Optimización de Estrategias de Carga y Query Builders

**Objetivo:**  
Reducir la sobrecarga en la capa de servicio y mejorar la eficiencia en la transferencia de datos.

**Mejoras a implementar:**
- Usar `QueryBuilder` para filtros complejos (ej. múltiples tags, rangos, búsquedas combinadas).
- Definir estrategias de carga de relaciones: 
  - Eager (siempre necesarias)
  - Lazy (solo cuando se accede)
- Limitar los campos retornados con `select` para evitar payload innecesario.
- Aplicar paginación consistente en endpoints de listas.

---

## 🌐 4. Optimización del Pool de Conexiones

**Meta:**  
Mejorar la estabilidad en entornos concurrentes o con alto tráfico.

**Tareas pendientes:**
- Definir tamaño del pool acorde al entorno (`max`, `min`, `idleTimeout`).
- Establecer `timeouts` y `retryDelays`.
- Verificar comportamiento en escenarios de reconexión o caídas.

---

## 📦 5. Estrategias de Caché

**Oportunidad:**  
Se identifican datos de alta consulta que podrían ser cacheados para reducir el impacto en la BD.

**Recomendaciones:**
- Cache de resultados para queries frecuentes (productos populares, reviews recientes, etc.).
- Integración con Redis para cache distribuido y segundo nivel.
- Evaluar uso de `@Cacheable` o sistemas personalizados por dominio.

---

## 🧱 6. Configuración de Producción

**Advertencia crítica:**  
Actualmente el modo `synchronize` está habilitado, lo cual es riesgoso en entornos productivos.

**Acciones necesarias:**
- Desactivar `synchronize` en `.env` de producción.
- Migrar a un sistema de `migrations` versionado (`typeorm migration:generate`, `run`, `revert`).
- Agregar configuraciones específicas por entorno (dev/test/prod).
- Establecer monitoreo de BD (slow queries, locks, uso de CPU/memoria).

---

## 🧬 7. Revisión de Columnas JSON

**Caso detectado:**  
El campo `tags` en productos usa `simple-json`, lo cual puede ser ineficiente.

**Revisión propuesta:**
- Evaluar normalización si los tags son reutilizables.
- Si se mantienen como JSON, usar funciones específicas de búsqueda JSON en MySQL 5.7+.
- Estudiar si se pueden aplicar índices sobre rutas JSON para mejorar rendimiento.

---

## 🧾 Observaciones Finales

✅ **Fortalezas actuales del proyecto:**
- Arquitectura modular y clara.
- Buen uso de DTOs y entidades.
- Sistema de seeding funcional y realista.

⚠️ **Puntos críticos a optimizar:**
- Ausencia de índices → afecta rendimiento de queries.
- Carga excesiva de datos → innecesaria en muchas respuestas.
- No hay estrategia definida de cache ni de paginación robusta.
- Producción aún en configuración de desarrollo (`synchronize: true`).

---

## 📍 Siguiente Paso Sugerido

✔️ Crear una rama de optimización:  
`feature/db-optimization`

✔️ Dividir la implementación por tareas:
- [ ] Task 1: Agregar índices a entidades críticas  
- [ ] Task 2: Refactor de queries ineficientes  
- [ ] Task 3: Configurar pool y caché  
- [ ] Task 4: Desactivar synchronize y migrar a esquema versionado  
- [ ] Task 5: Analizar uso de JSON vs relaciones

✔️ Agendar sesión de revisión luego de implementación (QA + DB monitoring).

---
