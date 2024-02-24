import { createContext } from "react";
import { IUser } from "../../../interfaces/IUser";
import { ActionUser } from "../reducers/userReducer";

interface UserContextProps {
    state: IUser[]
    dispatch: React.Dispatch<ActionUser>
}

//Creamos un Contexto para guardar el estado del userReducer y poder utilizarlo en varios componentes
export const UserContext = createContext<UserContextProps | undefined>(undefined)