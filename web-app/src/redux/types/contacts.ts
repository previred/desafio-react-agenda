export interface IUser {
    id: number;
    name: string;
    photo: string;
    description: string;
}

export interface ContactsState {
    /** Lista de contactos */
    users: IUser[];
    /** Muestra formulario de edición */
    open: boolean;
    /** Contacto seleccionado, para usar en el formulario */
    selectedUser?: IUser['id'] | null;
}

export const SET_OPEN = '[CONTACTS] SET_OPEN';
export interface SetOpenAction {
    type: typeof SET_OPEN;
    open: boolean;
}

export const SET_SELECTED_USER = '[CONTACTS] SET_SELECTED_USER';
export interface SetSelectedUserAction {
    type: typeof SET_SELECTED_USER;
    id?: IUser['id'] | null;
}

export const SET_USERS = '[CONTACTS] SET_USERS';
export interface SetUsersAction {
    type: typeof SET_USERS;
    users: ContactsState['users'];
}

export const ADD_USER = '[CONTACTS] ADD_USER';
export interface AddUserAction {
    type: typeof ADD_USER;
    user: ContactsState['users'][number];
}

export const UPDATE_USER = '[CONTACTS] UPDATE_USER';
export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    user: Partial<ContactsState['users'][number]> & Pick<ContactsState['users'][number], 'id'>;
}

export const DELETE_USER = '[CONTACTS] DELETE_USER';
export interface DeleteUserAction {
    type: typeof DELETE_USER;
    id: IUser['id']
}

export type ContactsActionTypes = SetOpenAction | SetSelectedUserAction | SetUsersAction | AddUserAction | UpdateUserAction | DeleteUserAction;