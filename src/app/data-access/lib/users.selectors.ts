import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');
//это только для загрузки юзеров чтобы были при изменении или доабвления нужно доаблять
export const getUsers = createSelector(
    selectUserState,
    state => state.users
);

export const getUsersLoading = createSelector(
    selectUserState,
    state => state.loading
);

export const getUsersError = createSelector(
    selectUserState,
    state => state.error
);
