import { User } from "../api/User/User.type";

// tipos de los estados globales
export type UserState = {
  usersList: User[];
  isOpenDrawer: boolean;
};

export type UserAction =
  | { type: "GETALLUSERS"; payload: { users: User[] } }
  | { type: "GETFILTERUSER"; payload: { letter: string } }
  | { type: "CHANGEOPENDRAW"; payload: { isOpen: boolean } };
