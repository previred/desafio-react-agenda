import { HttpStatusCode } from "axios";

export interface IApi<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  deleteUserById(id: string): Promise<HttpStatusCode>;
  saveUser(data: T): Promise<T>;
}
