# SARA 2.0 – QR de Ambientes (Diseño Funcional + Técnico)

Este documento resume la implementación correcta del QR para ambientes en SARA, alineada con el modelo que describiste.

## Modelo funcional

- El QR **NO crea** reservas ni horarios.
- El QR sirve únicamente para **confirmar/registrar el uso real del ambiente**.
- La reserva académica ya debe existir y haber sido creada por el Administrador.
- Cada **ambiente** tiene un único QR permanente.

Flujo general:

1. Administrador crea y gestiona reservas de ambiente.
2. El ambiente tiene un QR físico pegado (generado al crear el ambiente).
3. Instructor/Coordinador escanea el QR al iniciar uso.
4. SARA abre la URL `/qr/ambiente/:id`.
5. El backend valida: usuario, rol, ambiente activo, reserva activa para fecha/hora, tolerancia horaria, relación usuario–ficha.
6. Si todo es válido, se muestra el **Modal MD "Registro de uso de ambiente"**.
7. Al confirmar, se guarda el registro de uso (no se crea reserva nueva).

## Ruta y estructura del QR

- URL de QR recomendada:

  - `https://sara.midominio.com/qr/ambiente/:id`

- El contenido embebido en el código QR puede ser solo la URL o un JSON mínimo como referencia de ambiente:

  ```json
  {
    "ambiente_id": 15,
    "codigo": "LAB-301",
    "centro_id": 3,
    "tipo": "LABORATORIO"
  }
  ```

- El frontend define la ruta:

  - `/qr/ambiente/:id` → `EnvironmentQRPage`.

## Frontend – Piezas principales

### 1. Página de QR de ambiente

- Archivo: `src/features/environment-reservations/pages/EnvironmentQRPage.jsx`
- Responsabilidad:
  - Leer `:id` de la URL.
  - Consultar (por ahora con mocks) el ambiente y la reserva activa para:
    - Ese ambiente.
    - La fecha actual.
    - El rango horario actual con tolerancia (p.ej. ±15 minutos).
  - Si no hay ambiente: mostrar mensaje de "Ambiente no encontrado".
  - Si hay ambiente pero sin reserva activa: "Sin reserva activa".
  - Si existe reserva activa válida: abrir directamente el modal `QRUsageModal` (MD) para registro de uso real.

### 2. Modal de registro de uso por QR

- Archivo: `src/features/environment-reservations/components/QRUsageModal.jsx`
- Tipo: Dialog flotante MD.
- Datos automáticos (solo lectura):
  - Ambiente.
  - Fecha de la reserva.
  - Horario (inicio–fin) de la reserva activa.
- Campos del instructor/coordinador:
  - `Ficha *` (solo fichas asociadas a la reserva/usuario).
  - `Horario *` (si hay más de un bloque compatible, se listan; en mocks, uno solo).
  - `Observación` (opcional).
- Al confirmar:
  - Llama a `onConfirm(payload)` en el padre.
  - El payload típico contiene: `ficha`, `horario`, `observacion`.
  - El padre será quien invoque el endpoint `POST /qr/registro`.

### 3. Integración con reservas existentes

- La página `EnvironmentReservationsPage` continúa como módulo de gestión (Administrador):
  - Crear, editar, cancelar y ver reservas mediante los modales oficiales.
  - Incluye un botón de acción para abrir `QRUsageModal` sobre una reserva ya creada, útil para simulación o auditoría.
- El camino "oficial" de escaneo real para Instructor/Coordinador es vía `/qr/ambiente/:id`.

## Backend – Contrato sugerido

### Endpoints principales

1. `GET /qr/ambiente/:id`

   - Autenticación obligatoria.
   - Parámetros:
     - `id`: identificador interno del ambiente.
   - Lógica:
     - Validar que el usuario esté autenticado y tenga rol permitido (Instructor, Coordinador, Administrador).
     - Validar que el ambiente exista y esté activo.
     - Buscar una reserva académica **activa** para:
       - `ambiente_id = :id`.
       - `fecha = hoy`.
       - `hora_actual` dentro de `[hora_inicio - tolerancia, hora_fin + tolerancia]`.
     - Si existe reserva activa → devolverla (o un token/ID) al frontend.
     - Si no existe → devolver mensaje de "Sin reserva activa".

2. `POST /qr/registro`

   - Autenticación obligatoria.
   - Body propuesto:
     - `ambienteId` (number).
     - `reservaId` (number).
     - `fichaId` (number).
     - `horarioId` (number | string según modelo de horarios).
     - `observacion` (string, opcional).
   - Validaciones mínimas:
     - Usuario autenticado y rol permitido.
     - Ambiente activo.
     - Reserva asociada al ambiente, fecha y rango horario actual (con tolerancia).
     - Usuario asignado a la ficha/horario (según modelo de roles de SARA).
     - Evitar múltiples registros inconsistentes (p.ej., marcar el último como vigente).
   - Persistencia:
     - Guardar en tabla tipo `uso_ambiente_qr` con campos:
       - `id`, `usuario_id`, `rol`, `ambiente_id`, `reserva_id`, `ficha_id`, `horario_id`, `fecha`, `hora`, `estado`, `observacion`, `created_at`.
     - `estado` puede ser `VALIDO` / `INCONSISTENTE` (si falló alguna regla pero se quiere traza).

### Generación de QR al crear ambiente

- Al crear un ambiente se puede generar la URL de QR:

  ```js
  import QRCode from "qrcode";

  async function generarQR(ambienteId) {
    const url = `https://sara.midominio.com/qr/ambiente/${ambienteId}`;
    return await QRCode.toDataURL(url);
  }
  ```

- Se almacena la imagen o la URL en la tabla de ambientes.

## Reglas y restricciones clave

- **No** se crean reservas ni horarios desde el QR.
- El QR es **único por ambiente** y permanente.
- Solo perfiles **Instructor, Coordinador, Administrador** pueden registrar uso.
- Aprendices **no** deben poder registrar uso desde QR.
- Toda la trazabilidad de uso queda almacenada para fines de auditoría.

---

Este diseño deja listo el contrato entre frontend (rutas y modales) y backend (endpoints y reglas), manteniendo el modelo académico de SARA sin inventar reservas nuevas desde QR.
