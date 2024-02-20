import axios from "axios";
import { IApi } from "./IApi";

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
}
