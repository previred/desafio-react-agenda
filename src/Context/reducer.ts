import { User } from "../api/User/User.type";

type UserAction =
  | { type: "GETALLUSERS"; payload: { users: User[] } }
  | { type: "GETFILTERUSER"; payload: { letter: string } };

export const userReducer = (users: User[], action: UserAction): User[] => {
  switch (action.type) {
    case "GETALLUSERS":
      console.log(users);
      return action.payload.users;
    case "GETFILTERUSER":
      return users.filter((user) => user.name.includes(action.payload.letter));

    default:
      return users;
  }
};
