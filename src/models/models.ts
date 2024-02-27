export interface User {
    id: number;
    name: string;
    description: string;
    photo: string;
}

export interface UsersList {
    users: User[];
}

export interface UserContextType {
    users: User[];
    fetchUsers: (page?: number, limit?: number, query?: string) => Promise<void>;
    getUserById: (id: number) => Promise<void>;
    createUser: (user: User) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

