import { User } from "../api/User/User.type";

export type UserState = {
  usersList: User[];
  isOpenDrawer: boolean;
};
