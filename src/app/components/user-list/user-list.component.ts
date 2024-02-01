import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { LocalStargeService } from '../../services/local-starge.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,// ngIf, NgForOf
    UserCardComponent,
    AppHeaderComponent,
    MatButton,
    MatDialogClose,
    AppFooterComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  //подключяаем сервисы чтобы с ними работать
  private usersApiService = inject(UsersApiService)
  public usersService = inject(UsersService)
  public LocalStargeService = inject(LocalStargeService)
  private dialog = inject(MatDialog)

  constructor(
    // private UsersService: UsersService,  //в старой версии делается так
    // private usersApiService: UsersApiService
  ) { }

  ngOnInit() {//при инициализации компонента

    const isUsers = this.LocalStargeService.getItem('users');
    if (isUsers && isUsers.length > 0) {
      this.usersService.setUsers(isUsers);
    } else {
      this.usersApiService.getUsers().subscribe(
        {
          next: (response: IUser[]) => {
            this.usersService.setUsers(response);
            this.LocalStargeService.setItem('users', this.usersService.users)
          },
          error: (error) => {
            console.error('Ошибка получения юзера', error)
          }
        });
    }
  }
  //Удаление пользователя по id
  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
    this.LocalStargeService.setItem('users', this.usersService.users)
  }

  onAddUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      //передаем первоначальные данные при открытии окна модального
      data: { user: null, isEdit: false }
    });
    //получаем данные полсе закрытия формы
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.usersService.createUser(result);
          this.LocalStargeService.setItem('users', this.usersService.users)
        }
      })
  }

  onEditUser(user: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user, isEdit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editUser(result);
        this.LocalStargeService.setItem('users', this.usersService.users)
      }
    })
  }
}
