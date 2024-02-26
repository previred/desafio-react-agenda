// Importaciones de React y librerías externas
import { FC, ReactElement } from "react";
import Router from "./router/Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configuración inicial del cliente de React Query
// Se desactiva la recarga automática de consultas al ingresar a la ventana (focus)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Componente App: Punto de entrada principal de la aplicación.
 * Utiliza el QueryClientProvider para proporcionar un contexto de React Query,
 * permitiendo a los componentes hijos realizar consultas de datos de forma eficiente.
 * Envuelve el componente Router para gestionar la navegación (rutas) dentro de la aplicación.
 *
 * @return {ReactElement}
 */
const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
