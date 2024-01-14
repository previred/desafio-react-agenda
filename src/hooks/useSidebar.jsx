import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";

// custom hook contexto
export const useSidebar = () => useContext(SidebarContext);
