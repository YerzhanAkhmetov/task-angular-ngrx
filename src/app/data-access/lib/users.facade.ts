import { LocalStorageService } from './../../services/local-starge.service';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from './users.actions';
import * as UserSelectors from './users.selectors';
import { IUser } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    users$: Observable<IUser[]>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    private localStorageService = inject(LocalStorageService);

    constructor(private store: Store) {
        this.users$ = this.store.pipe(select(UserSelectors.getUsers));
        this.loading$ = this.store.pipe(select(UserSelectors.getUsersLoading));
        this.error$ = this.store.pipe(select(UserSelectors.getUsersError));
    }

    loadUsers(): void {
        this.store.dispatch(UserActions.loadUsers());
    }

    addUser(user: IUser): void {
        this.store.dispatch(UserActions.createUser({ user }));
    }

    editUser(user: IUser): void {
        this.store.dispatch(UserActions.editUser({ user }));
    }

    deleteUser(id: number): void {
        this.store.dispatch(UserActions.deleteUser({ id }));
    }

    saveUsersToLocalStorage(users: IUser[]): void {
        this.localStorageService.setItem('users', users);
    }

}
