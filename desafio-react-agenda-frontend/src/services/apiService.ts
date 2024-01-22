import axios from 'axios';
import { IUser } from '../types/userTypes';

const API_BASE_URL = 'http://localhost:9000/api';

export const getUsers = async (page: number, limit: number): Promise<{data: IUser[], total: number}> => {
  const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
          _page: page,
          _limit: limit
      }
  });
  const total = parseInt(response.headers['x-total-count'], 10);
  return {
      data: response.data,
      total: total
  };
};

export const getUser = async (id: number): Promise<IUser> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user: IUser): Promise<IUser> => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<IUser> => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};