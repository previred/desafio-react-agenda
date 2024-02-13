import type { Store } from 'redux';
import {
    combineReducers,
    legacy_createStore as createStore
} from 'redux';
import { RootState } from '../interface';
import { contactsReducer } from './reducers/contacts';


const reducers = combineReducers({
    contacts: contactsReducer
});

export const store: Store<RootState, any> = createStore(
    reducers,
);

export type AppDispatch = typeof store.dispatch;
