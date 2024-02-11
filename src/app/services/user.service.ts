import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
    public users: IUser[] = [];

    setUsers(users: IUser[]) {
        this.users = users;
    }

    deleteUser(id: number): Observable<void> {
        this.users = this.users.filter(user => user.id !== id);
        return of(null).pipe(
            map(() => { })
        );
    }

    createUser(newUser: IUser): Observable<IUser> {
        let maxUserId = Math.max(...this.users.map(user => user.id), 0);
        const user: IUser = {
            id: ++maxUserId,
            name: newUser?.username,
            username: newUser?.username,
            email: newUser?.email,
            address: {
                street: newUser?.address?.street,
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: "",
                },
            },
            phone: newUser?.phone,
            website: newUser?.website,
            company: {
                name: newUser?.company?.name,
                catchPhrase: "",
                bs: "",
            }
        }
        this.users = [...this.users, user];
        return of(user);
    }

    editUser(newUser: IUser): Observable<IUser> { // Возвращаем Observable<IUser> вместо Observable<void>
        this.users = this.users.map(user => (user.id === newUser.id ? newUser : user))
        return of(newUser); // Возвращаем обновленного пользователя
    }
}
