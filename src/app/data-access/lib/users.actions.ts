import { IUser } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: IUser[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

export const deleteUser = createAction('[USERS] Delete Users', props<{ id: number }>());
export const deleteUserSuccess = createAction('[USERS] Delete Users Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[USERS] Delete Users Failure', props<{ error: any }>());

export const editUser = createAction('[USERS] Edit Users', props<{ user: IUser }>());
export const editUserSuccess = createAction('[USERS] Edit Users Success', props<{ user: IUser }>());
export const editUserFailure = createAction('[USERS] Edit Users Failure', props<{ error: any }>());

export const createUser = createAction('[USERS] Create Users', props<{ user: IUser }>());
export const createUserSuccess = createAction('[USERS] Create Users Success', props<{ user: IUser }>());
export const createUserFailure = createAction('[USERS] Create Users Failed', props<{ error: any }>());