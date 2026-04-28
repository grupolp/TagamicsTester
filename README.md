# Tagamics Tester

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**Tagamics Tester** es una aplicación interna diseñada para facilitar la prueba, validación y depuración de máquinas Tagamic físicas.

Proporciona una interfaz optimizada para dispositivos móviles que permite a los técnicos escanear códigos QR de las máquinas, recuperar su estado y configuración en tiempo real desde el *Backoffice*, y ejecutar pruebas de funcionamiento (integración con flujos de pago como Mercado Pago).

## Características Principales

- 📷 **Lector de Código QR Integrado**: Escaneo rápido de los IDs de las máquinas a través de la cámara trasera del dispositivo móvil utilizando `@yudiel/react-qr-scanner`.
- 🔍 **Inspección de Máquinas**: Consulta en tiempo real de los metadatos de la máquina (estado de conexión, activación, `Terminal`, `Store` asociado y listado de *Price Sets* activos).
- 🧪 **Prueba de Funcionamiento**: Flujo integrado para simular pagos y validar el correcto encendido o activación de las máquinas de forma segura en terreno.
- 🌍 **Internacionalización (i18n)**: Detección automática del idioma del navegador soportando múltiples idiomas.
- 💅 **UI/UX Moderna**: Interfaz "glassmórfica" construida con *Chakra UI v3*, siguiendo las mejores prácticas de diseño de Vercel y guías de interfaz moderna.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular en React:

```text
src/
├── components/       # Componentes reusables de la UI (Header, botones, inputs)
├── i18n/             # Configuración y diccionarios de traducciones
├── models/           # Definiciones de Tipos e Interfaces TypeScript (ej. Tagamic)
├── pages/            # Vistas principales de la app
│   ├── Login/        # Autenticación y acceso
│   └── Scanner/      # Flujo de lectura de QR y detalles de la máquina
├── routes/           # Configuración del React Router
└── services/         # Integraciones con la API (axios) y endpoints específicos
```

## Requisitos Previos

- **Node.js** (v18+)
- **NPM** o **Yarn**

## Variables de Entorno

Antes de correr el proyecto, asegúrate de configurar tu archivo `.env` en la raíz del repositorio basándote en un archivo `.env.example` (si aplica). Las variables principales son:

```env
VITE_ENV=development
VITE_API_BASE_URL=https://backoffice.magneticash.com/magnetic
VITE_API_CALLBACK_BASE_URL=https://dev.tagamics.com/callback
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxx-xxxx
```

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   cd TagamicsTester
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 📱 Pruebas en Dispositivos Móviles (Red Local)

Debido a las estrictas políticas de seguridad de los navegadores modernos, **el acceso a la cámara mediante IPs locales (ej. `192.168.x.x`) requiere una conexión HTTPS segura**.

Si deseas acceder a la app de desarrollo desde tu celular usando la misma red WiFi, es necesario utilizar el plugin SSL de Vite.

Asegúrate de correr el servidor con soporte de host (y configurar HTTPS en `vite.config.ts` si corresponde):
```bash
npm run dev -- --host
```
*(Nota: El proyecto tiene instalado `@vitejs/plugin-basic-ssl` para facilitar este proceso en entorno local).*

## Tecnologías Utilizadas

- **Core**: React 19, Vite
- **Lenguaje**: TypeScript
- **Estilos y Componentes**: Chakra UI v3, Heroicons
- **Lógica de Formularios**: React Hook Form
- **Escáner QR**: `@yudiel/react-qr-scanner` (v2.5+)
- **HTTP Client**: Axios
- **Internacionalización**: `i18next`, `react-i18next`

## Directrices y Buenas Prácticas

Este proyecto está construido siguiendo rigurosos estándares de rendimiento y UI:
- **Vercel React Best Practices**: Memorización estratégica de estados derivados (`useMemo`), optimizaciones de renderizado y manejo eficiente de estados de carga (evitando waterfalls).
- **Web Design Guidelines**: Utilización estricta de elementos semánticos, `aria-labels` para accesibilidad, estados focales visibles, animaciones sutiles y estilos de tipografía avanzados (`tabular-nums`).

---
*Mantenido por el equipo de desarrollo de Magnetic Cash.*
