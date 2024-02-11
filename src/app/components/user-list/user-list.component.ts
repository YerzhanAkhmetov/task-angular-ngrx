import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { LocalStorageService } from '../../services/local-starge.service';
import { UserFacade } from '../../data-access';
import { tap } from 'rxjs';
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
  public usersService = inject(UsersService)
  public LocalStargeService = inject(LocalStorageService)
  private dialog = inject(MatDialog)
  private userFacade = inject(UserFacade)

  users$ = this.userFacade.users$;

  ngOnInit() {
    // Получаем список пользователей из хранилища
    this.userFacade.loadUsers();
  }

  onDeleteUser(id: number) {
    // Диспатчим экшен для удаления пользователя
    this.userFacade.deleteUser(id);
  }

  onAddUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().pipe(
      tap((response: IUser) => {
        if (response) {
          // Диспатч экшена для добавления нового пользователя
          this.userFacade.addUser(response);
        }
      })
    ).subscribe();
  }

  onEditUser(user: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user, isEdit: true }
    });

    dialogRef.afterClosed().pipe(
      tap((response: IUser) => {
        if (response) {
          // Диспатч экшена для редактирования пользователя
          this.userFacade.editUser(response);
        }
      })
    ).subscribe();
  }
}
