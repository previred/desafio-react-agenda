// Importación de los componentes de React y React Router DOM
import { FC } from "react";
import { Routes, Navigate, Route, BrowserRouter } from "react-router-dom";

// Importación del componente AgendaView, que representa la vista de la agenda
import AgendaView from "../views/agenda/AgendaView.tsx";

/**
 * Componente Router: Define la estructura de navegación.
 * Utiliza BrowserRouter como componente de más alto nivel para manejar la navegación basada en el historial del navegador.
 * Se configuran las rutas específicas de la agenda.
 *
 * @return Lógica de enrutamiento.
 */
const Router: FC = () => {
  return (
    // BrowserRouter envuelve las rutas de la aplicación, permite la navegación basada en URL.
    <BrowserRouter>
      {/* Routes define el contexto para las rutas hijas, se espedifican los componentes a renderizar. */}
      <Routes>
        {/* 
          Ruta index: Redirecciona automáticamente a '/agenda'.
          Utiliza el componente Navigate para reemplazar la URL actual por '/agenda'.
        */}
        <Route index element={<Navigate to="/agenda" replace />} />
        {/* 
          Ruta '/agenda': Renderiza el componente AgendaView cuando se navega a '/agenda'.
        */}
        <Route path="/agenda" element={<AgendaView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
