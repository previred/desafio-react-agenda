import type { Reducer } from "redux";
import type { ContactsState, ContactsActionTypes } from "../types/contacts";
import { ADD_USER, DELETE_USER, SET_OPEN, SET_SELECTED_USER, SET_USERS, UPDATE_USER } from "../types/contacts";

const initialState: ContactsState = {
    users: [],
    open: false,
    selectedUser: null,
};

export const contactsReducer: Reducer<ContactsState, ContactsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPEN:
            return { ...state, open: action.open };
        case SET_SELECTED_USER:
            return { ...state, selectedUser: action.id };
        case SET_USERS:
            return { ...state, users: action.users };
        case ADD_USER:
            return { ...state, users: [...state.users, action.user] };
        case UPDATE_USER:
            return { ...state, users: state.users.map(d => d.id === action.user.id ? ({ ...d, ...action.user }) : d) };
        case DELETE_USER:
            return { ...state, users: state.users.filter(f => f.id !== action.id) };
        default:
            return state;
    }
}; 