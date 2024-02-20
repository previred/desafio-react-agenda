import { FC, PropsWithChildren, useReducer } from "react";
import { userReducer } from "./reducer";
import { UserContext } from "./context";
import { User } from "../api/User/User.type";

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialStateUser: User[] = [{ name: "", description: "", photo: "" }];

  const [stateUsers, dispatch] = useReducer(userReducer, initialStateUser);

  const getAllUsers = (users: User[]) => {
    dispatch({ type: "GETALLUSERS", payload: { users } });
  };

  const getFilterUser = (letter: string) => {
    dispatch({ type: "GETFILTERUSER", payload: { letter: letter } });
  };

  return (
    <UserContext.Provider value={{ stateUsers, getAllUsers, getFilterUser }}>
      {children}
    </UserContext.Provider>
  );
};
