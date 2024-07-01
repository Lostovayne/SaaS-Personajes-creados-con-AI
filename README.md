# AI Companion

Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). El objetivo de este proyecto es proporcionar una plataforma interactiva y dinámica utilizando tecnologías modernas como Next.js, Prisma, TailwindCSS, y Clerk para la autenticación.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **Prisma**: ORM para bases de datos.
- **TailwindCSS**: Framework de CSS para diseño.
- **Clerk**: Autenticación y gestión de usuarios.
- **MySQL**: Base de datos relacional.
- **Docker**: Contenedorización de servicios.

## Requisitos Previos

- Node.js (v14 o superior)
- Docker (opcional, para base de datos)
- npm, yarn, pnpm o bun (gestores de paquetes)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/ai-companion.git
cd ai-companion
```

2. Instala las dependencias:

```bash
npm install
```


3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes
variables:
- DATABASE_URL=mysql://companion:password@localhost:3308/companion
- NEXT_PUBLIC_CLERK_FRONTEND_API=<tu_clerk_frontend_api>
- CLERK_API_KEY=<tu_clerk_api_key>

4. Levanta la base de datos con Docker (opcional):

```bash
docker-compose up -d
```

5. Ejecuta las migraciones de ``Prisma``:

```bash
npx prisma migrate dev
```

6. Si deseas poblar la base de datos con datos iniciales, ejecuta el script de seed:

```bash
npm run seed
```

## Ejecución del Proyecto

7. Para levantar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

- **`app/`**: Contiene las páginas y layouts de la aplicación.
- **`components/`**: Componentes reutilizables de la UI.
- **`lib/`**: Utilidades y configuraciones globales.
- **`prisma/`**: Esquema de la base de datos y migraciones.
- **`scripts/`**: Scripts para tareas específicas como el seed de la base de datos.
- **`styles/`**: Archivos de estilos globales.

## Funcionalidades

- **Autenticación**: Gestión de usuarios con Clerk.
- **Búsqueda**: Componente de búsqueda con debounce.
- **Categorías**: Listado y filtrado de categorías.
- **Temas**: Soporte para temas claros y oscuros.

## Futuras Integraciones

- **Notificaciones**: Integración con un sistema de notificaciones en tiempo real.
- **Internacionalización**: Soporte para múltiples idiomas.
- **PWA**: Convertir la aplicación en una Progressive Web App.
- **Integración con APIs externas**: Añadir soporte para consumir datos de APIs externas.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Despliegue

La forma más sencilla de desplegar tu aplicación Next.js es utilizando la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) creada por los desarrolladores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment) para más detalles.

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial interactivo de Next.js](https://nextjs.org/learn)
- [Repositorio de GitHub de Next.js](https://github.com/vercel/next.js/)

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por usar AI Companion! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir al proyecto.
