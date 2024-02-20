import { createContext } from "react";
import { User } from "../api/User/User.type";
import { UserState } from "./context.type";

// tipos de las propiedades que espera nuestro contexto
export type stateContextUsers = {
  stateUsers: UserState;
  getAllUsers: (users: User[]) => void;
  getFilterUser: (letter: string) => void;
  changeIsOpenDraw: (isOpen: boolean) => void;
};

export const UserContext = createContext<stateContextUsers>(
  {} as stateContextUsers
);
