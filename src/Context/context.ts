import { createContext } from "react";
import { User } from "../api/User/User.type";

export type stateContextUsers = {
  stateUsers: User[];
  getAllUsers: (users: User[]) => void;
  getFilterUser: (letter: string) => void;
};

export const UserContext = createContext<stateContextUsers>(
  {} as stateContextUsers
);
