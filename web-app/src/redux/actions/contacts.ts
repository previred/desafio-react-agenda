import { ADD_USER, ContactsState, DELETE_USER, IUser, SET_OPEN, SET_SELECTED_USER, SET_USERS, UPDATE_USER } from "../types/contacts";

export function setUsers(users: ContactsState['users']) {
    return {
        type: SET_USERS,
        users,
    };
}

export function addUser(user: ContactsState['users'][number]) {
    return {
        type: ADD_USER,
        user,
    };
}

export function updateUser(user: Partial<ContactsState['users'][number]> & Pick<ContactsState['users'][number], 'id'>) {
    return {
        type: UPDATE_USER,
        user,
    };
}

export function deleteUser(id: IUser['id']) {
    return {
        type: DELETE_USER,
        id,
    };
}

export function setOpen(open: boolean) {
    return {
        type: SET_OPEN,
        open,
    };
}

export function setSelectedUser(id?: IUser['id'] | null) {
    return {
        type: SET_SELECTED_USER,
        id,
    };
}