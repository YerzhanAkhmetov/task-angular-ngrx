
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../libs/api-url';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
    //Получаем данные сервисов чтобы с ними работаь из провайдер
    private readonly http = inject(HttpClient);
    private readonly apiUrl = inject(API_URL);

    //Получаем пользователей
    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.apiUrl);
    }

}