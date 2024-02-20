import axios, { HttpStatusCode } from "axios";
import { IApi } from "./IApi";

//Clase api donde se utiliza el patron repositorio, de esta manera abstraemo la implementación del llamado de los endpoint de la logica de negocio
export class Api<T> implements IApi<T> {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }
  async getAll(): Promise<T[]> {
    const response = await axios.get<T[]>(this.url);
    return response.data;
  }

  async getById(id: string): Promise<T> {
    const response = await axios.get<T>(`${this.url}/${id}`);
    return response.data;
  }

  async deleteUserById(id: string): Promise<HttpStatusCode> {
    const { status } = await axios.delete(`${this.url}/${id}`);
    return status;
  }

  async saveUser(dataUser: T): Promise<T> {
    const { data } = await axios.post<T>(
      this.url,
      { ...dataUser },
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
}
