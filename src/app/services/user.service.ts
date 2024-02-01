import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    //Сервис для временного хранения дданых users ЛОКАЛЬНЫЙ
    public users: IUser[] = [];  //6 task
    //Записываем пользователей
    setUsers(users: IUser[]) {
        this.users = users;
    }
    //Удаляем пользоватля из локального стэйта
    deleteUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);
    }
    //Создаем пользователя
    createUser(newUser: IUser): IUser {
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
        return user
    }
    //Редактируем юзера
    editUser(newUser: IUser) {
        this.users = this.users.map(user => (user.id === newUser.id ? newUser : user))
    }
}