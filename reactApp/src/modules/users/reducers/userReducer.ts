import { IUser } from "../../../interfaces/IUser";

// Definición de los tipos de acción para el reducer
export type ActionUser =
    | { type: 'SET_USERS'; payload: IUser[] }
    | { type: 'ADD_USER'; payload: IUser }
    | { type: 'DELETE_USER'; payload: number }

//Creamos el reducer para manejar el CRUD de usuarios
export const userReducer = (state: IUser[], action: ActionUser): IUser[] => {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload
        case 'ADD_USER':
            return [action.payload, ...state]
        case 'DELETE_USER':
            return state.filter((user) => user.id !== action.payload)
        default:
            return state
    }
}