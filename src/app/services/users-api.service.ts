import { LocalStorageService } from './local-starge.service';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../libs/api-url';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = inject(API_URL);
    private readonly localStorageService = inject(LocalStorageService);

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.apiUrl);
    }

    addUser(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(this.apiUrl, user);
    }

    updateUser(user: IUser): Observable<IUser> {
        return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
