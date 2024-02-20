import React, { FC, PropsWithChildren, useReducer } from "react";
import { userReducer } from "./reducer";
import { UserContext } from "./context";
import { User } from "../api/User/User.type";
import { UserState } from "./context.type";

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialStateUser: UserState = {
    usersList: [{ name: "", description: "", photo: "" }],
    isOpenDrawer: false,
  };

  const [stateUsers, dispatch] = useReducer(userReducer, initialStateUser);

  const getAllUsers = (users: User[]) => {
    dispatch({ type: "GETALLUSERS", payload: { users } });
  };

  const getFilterUser = (letter: string) => {
    dispatch({ type: "GETFILTERUSER", payload: { letter: letter } });
  };

  const changeIsOpenDraw = (isOpen: boolean) => {
    console.log(isOpen);
    dispatch({ type: "CHANGEOPENDRAW", payload: { isOpen: isOpen } });
  };

  return (
    <UserContext.Provider
      value={{ stateUsers, getAllUsers, getFilterUser, changeIsOpenDraw }}>
      {children}
    </UserContext.Provider>
  );
};
