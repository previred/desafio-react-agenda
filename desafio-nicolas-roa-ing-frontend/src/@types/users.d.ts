/* 
    Interface de usuario (campos que nos trae el api)
*/

export interface IUser {
    id: number,
    name: string,
    description: string;
    photo: string
}

/*
    Type del user context el cual si requerimos debe cumplir con esta estructura de props
*/

export type UserContextType = {
    users: IUser[];
    isLoading: boolean;
    error: Error | null;
    saveUser: (user: IUser) => void;
    searchUser: (name: string) => void;
    deleteUser: (id: number) => void;
};