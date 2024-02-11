import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { IUser } from '../../models/user.model';

export interface UserState {
    users: IUser[];
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const USERS_KEY = 'users';
export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, state => ({
        ...state,
        loading: true
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        loading: false,
        error: null
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(UserActions.createUser, state => ({
        ...state,
        loading: true
    })),
    on(UserActions.createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        error: null
    })),
    on(UserActions.createUserFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(UserActions.editUser, state => ({
        ...state,
        loading: true
    })),
    on(UserActions.editUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u),
        error: null
    })),
    on(UserActions.editUserFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(UserActions.deleteUser, state => ({
        ...state,
        loading: true
    })),
    on(UserActions.deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users.filter(u => u.id !== id),
        error: null
    })),
    on(UserActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        error: error
    }))
);

