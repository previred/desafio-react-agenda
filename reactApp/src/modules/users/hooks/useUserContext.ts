import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

//Creamos un Hook para poder acceder al contexto que forma más fácil
export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext debe ser utilizado dentro de un UserProvider');
    }
    return context;
};