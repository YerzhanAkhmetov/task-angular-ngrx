import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const appRoutes: Routes = [
    { path: '', component: UserListComponent },//pathMatch:'full' --чтобы если его нет этого пути он не открывал приложение
];
