import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // localStorage, недоступен во время выполнения на сервере 
  //чтобы избежать ошибки ERROR ReferenceError: localStorage is not defined 
  //Добавляем PLATFORM_ID
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setItem(key: string, users: IUser[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(users));
    }
  }

  getItem(key: string): IUser[] | null {
    //ошибка код выполняется не в контексте браузера
    if (isPlatformBrowser(this.platformId)) {
      const users = localStorage.getItem(key);
      if (users) {
        return JSON.parse(users);
      } else {
        return null;
      }
    } else {
      return null; // Возвращаем null, если код выполняется не в браузере
    }
  }
  // removeItem(key: string): boolean {
  //   localStorage.removeItem('jwtToken');
  //   return true;
  // }
}
