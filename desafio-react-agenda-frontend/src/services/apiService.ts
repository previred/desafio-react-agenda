import axios from 'axios';
import { IUser } from '../types/userTypes';

// URL base de la API
const API_BASE_URL = 'http://localhost:9000/api';

// Retorna una lista de usuarios, con paginación y búsqueda
export const getUsers = async (
  page: number,
  limit: number,
  searchQuery?: string,
): Promise<{ data: IUser[]; total: number }> => {
  const response = await axios.get(`${API_BASE_URL}/users`, {
    params: {
      _page: page,
      _limit: limit,
      q: searchQuery,
    },
  });
  const total = parseInt(response.headers['x-total-count'], 10);
  return {
    data: response.data,
    total: total,
  };
};

// Retorna un usuario por id
export const getUser = async (id: number): Promise<IUser> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};

// Crea un usuario
export const createUser = async (user: IUser): Promise<IUser> => {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return response.data;
};

// Elimina un usuario
export const deleteUser = async (id: number): Promise<IUser> => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
  return response.data;
};
