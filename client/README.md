# Desafio React Agenda de Contactos

## Pre-requisitos

- NodeJS v18.19.0 con NVM 0.39.1
- NPM 10.2.3
- PNPM 8.14.0 (npm install -g pnpm)

## Instalación

- Clonar el repositorio
- Cambiar a la rama `desafio-moveapps-jslr`
- Para el servidor ejecutar `pnpm install` y luego `pnpm start-server`
- Para el cliente ejecutar `pnpm install` y luego `pnpm run dev`

## Consideraciones

- Se utilizó `pnpm` como gestor de paquetes
- Se utilizó `antd` para los componentes visuales
- Atomic Design para la estructura de carpetas de componentes visuales

## Estructura de carpetas del cliente

```
client
├── public
│   └── vite.svg                            # Vite logo (default).
├── src
│   ├── api
│   │   └── user.js                         # Funciones para consumir la API.
│   ├── context
│   │   └── UserContext.jsx                 # Contexto para manejar el estado de los usuarios.
│   ├── hook
│   │   ├── useAddUser.js                   # Hook para agregar un usuario.
│   │   └── useUserList.js                  # Hook para obtener los usuarios.
│   ├── ui
│   │   ├── atoms                           # Componentes visuales atómicos.
│   │   │   ├── Button
│   │   │   │   └── index.jsx
│   │   │   └── Search
│   │   │       └── index.jsx
│   │   ├── molecules                       # Componentes visuales moleculares.
│   │   │   ├── AddUserForm
│   │   │   │   └── index.jsx
│   │   │   └── UserTable
│   │   │       └── index.jsx
│   │   ├── organisms                       # Componentes visuales organicos.
│   │   │   ├── AddUser
│   │   │   │   └── index.jsx
│   │   │   └── UserList
│   │   │       └── index.jsx
│   │   └── templates                       # Componentes visuales plantilla. Puente entre el contexto y los componentes visuales 
│   │       └── UserContactList
│   │           └── index.jsx
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js
``` 

## Agradecimientos

- [MoveApps](https://www.moveapps.cl/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)