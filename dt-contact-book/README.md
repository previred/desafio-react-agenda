## Empezando

Primero, asegúrate de tener instalada la versión de Node.js 18.17 o superior. Puedes descargar la versión más reciente desde [el sitio oficial de Node.js](https://nodejs.org/).

### Variables de Entorno

Para configurar tus variables de entorno, necesitarás crear un archivo `.env.local` en el directorio raíz de tu proyecto. Puedes empezar copiando el archivo `.env` y actualizando la variable `NEXT_PUBLIC_API_URL` para que apunte a tu API backend. Por ejemplo:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:9000/api
```

Asegúrate de reemplazar `http://localhost:9000/api` con la URL real de tu backend.

### Instalación de pnpm

Si aún no tienes `pnpm` instalado, puedes hacerlo globalmente con el siguiente comando:

```bash
npm install -g pnpm
```

Instalamos las dependencias con el siguiente comando

```bash
pnpm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.
