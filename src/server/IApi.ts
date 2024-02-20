import { HttpStatusCode } from "axios";

//Contrato de la clase api, de esta manera definimos la estructura que tendra nuestra clase que realiza el llamado a las apis
export interface IApi<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  deleteUserById(id: string): Promise<HttpStatusCode>;
  saveUser(data: T): Promise<T>;
}
