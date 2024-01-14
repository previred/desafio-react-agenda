import { useState, createContext } from "react";
import PropTypes from "prop-types";

// contexto
export const SidebarContext = createContext();

// provider del contexto
export const SidebarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showSidebar = () => setVisible(true);
  const hideSidebar = () => setVisible(false);

  return (
    <SidebarContext.Provider value={{ visible, showSidebar, hideSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node,
};
