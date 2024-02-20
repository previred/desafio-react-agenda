import { User, UserState } from "../api/User/User.type";

type UserAction =
  | { type: "GETALLUSERS"; payload: { users: User[] } }
  | { type: "GETFILTERUSER"; payload: { letter: string } }
  | { type: "CHANGEOPENDRAW"; payload: { isOpen: boolean } };

export const userReducer = (
  users: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "GETALLUSERS":
      return { ...users, usersList: action.payload.users };
    case "GETFILTERUSER":
      return {
        ...users,
        usersList: users.usersList.filter((user) =>
          user.name.includes(action.payload.letter)
        ),
      };
    case "CHANGEOPENDRAW":
      console.log(action.payload.isOpen);
      return { ...users, isOpenDrawer: action.payload.isOpen };
    default:
      return { ...users };
  }
};
