import { HttpStatusCode } from "axios";

//TODO: VALIDAR SI EL SAVE Y UPDATE DEBEN RETORNAR GENERICO T
export interface IApi<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  deleteUserById(id: string): Promise<HttpStatusCode>;
  //   saveUser<K>(data: K): undefined;
  //   updateUser<K>(data: K): Promise<T>;
}
