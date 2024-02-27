import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { User, UserContextType } from '../models/models';


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const endpoint = 'http://localhost:9000';


    const fetchUsers = async (page?: number, limit?: number, query: string = '') => {
        try {
            const response = await axios.get(`${endpoint}/api/users?_page=${page}&_limit=${limit}&q=${query}`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };


    const getUserById = async (id: number) => {
        try {
            const response = await axios.get(`${endpoint}/api/users/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user by ID", error);
        }
    };


    const createUser = async (user: User) => {
        try {
            const response = await axios.post(`${endpoint}/api/users/`, user, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);

        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`${endpoint}/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };


    return (
        <UserContext.Provider value={{ users, fetchUsers, getUserById, createUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};
