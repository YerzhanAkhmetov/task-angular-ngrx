import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from './users.actions';
import { LocalStorageService } from '../../services/local-starge.service';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/user.service';
import { IUser } from '../../models/user.model';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private localStorageService = inject(LocalStorageService);
  private usersApiService = inject(UsersApiService);
  private usersService = inject(UsersService);

  loadUsers$ = createEffect(() => this.actions$.pipe(

    ofType(UserActions.loadUsers),
    switchMap(() => {
      const usersFromLocalStorage = this.localStorageService.getItem('users');
      if (usersFromLocalStorage && usersFromLocalStorage.length > 0) {
        return of(UserActions.loadUsersSuccess({ users: usersFromLocalStorage }));
      } else {
        return this.usersApiService.getUsers().pipe(
          tap(apiUsers => this.localStorageService.setItem('users', apiUsers)),
          map(apiUsers => UserActions.loadUsersSuccess({ users: apiUsers })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        );
      }
    })
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.createUser),
    switchMap(({ user }) => {
      return this.usersService.createUser(user).pipe(
        tap(createdUser => {
          // Получаем текущий список пользователей из локального хранилища
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          let updatedUsers: IUser[] = [];
          if (usersFromLocalStorage) {
            // Если пользователи уже есть в хранилище, добавляем к ним нового пользователя
            updatedUsers = [...usersFromLocalStorage, createdUser];
          } else {
            // Если в хранилище нет пользователей, создаем новый список с одним пользователем
            updatedUsers = [createdUser];
          }
          // Сохраняем обновленный список пользователей в локальное хранилище
          this.localStorageService.setItem('users', updatedUsers);
        }),
        map(createdUser => UserActions.createUserSuccess({ user: createdUser })),
        catchError(error => of(UserActions.createUserFailure({ error })))
      );
    })
  ));

  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.editUser),
    switchMap(({ user }) => {
      return this.usersService.editUser(user).pipe(
        tap(() => {
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          if (usersFromLocalStorage) {
            const updatedUsers = usersFromLocalStorage.map((u: IUser) => u.id === user.id ? user : u);
            this.localStorageService.setItem('users', updatedUsers);
          }
        }),
        map(() => UserActions.editUserSuccess({ user })),
        catchError(error => of(UserActions.editUserFailure({ error })))
      );
    })
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    switchMap(({ id }) => {
      console.log("2");
      return this.usersService.deleteUser(id).pipe(
        tap(() => {
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          if (usersFromLocalStorage) {
            const updatedUsers = usersFromLocalStorage.filter((user: IUser) => user.id !== id);
            this.localStorageService.setItem('users', updatedUsers);
          }
        }),
        map(() => UserActions.deleteUserSuccess({ id })),
        catchError(error => of(UserActions.deleteUserFailure({ error })))
      );
    })
  ));
}


