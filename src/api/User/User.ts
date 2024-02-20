import { HttpStatusCode } from "axios";
import { Api } from "../../server/Api";
import { User } from "./User.type";

const userApi = new Api<User>("http://localhost:9000/api/users");

export const getAllUsersApi = async (): Promise<User[]> => {
  const allUsers = await userApi.getAll();
  return allUsers;
};

export const deleteUserByIdApi = async (
  id: string
): Promise<HttpStatusCode> => {
  const statusCode = await userApi.deleteUserById(id);
  return statusCode;
};
