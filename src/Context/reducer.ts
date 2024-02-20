import { UserAction, UserState } from "./context.type";

//reducer de nuestro contexto global, en esta función se modifican los estados globales definidos

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
