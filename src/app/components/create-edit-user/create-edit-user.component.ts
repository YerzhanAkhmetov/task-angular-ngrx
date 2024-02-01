import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/user.service';
import { IUser } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDialogActions, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})

export class CreateEditUserComponent implements OnInit {
  public usersService = inject(UsersService);
  public userForm!: FormGroup;
  public isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser, isEdit: boolean },//получаем открытую форму с данными из user-list
    public dialogRef: MatDialogRef<CreateEditUserComponent>, //ссылку на диалоговое окно
  ) {
    //инициализируем данные при загрузке окна
    this.userForm = new FormGroup({
      id: new FormControl(0),
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', [Validators.required]),
      }),
      phone: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      }),
    });
    this.isEdit = data.isEdit;
  }

  //инициализация компоненты как типо useEffect
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.userForm.patchValue(this.data.user);
    }
  }

  //отмена
  onCancel() {
    this.dialogRef.close()
  }

  //Добавление и изменение юзера
  onCreateEditUser() {
    if (this.userForm.valid) {
      // if (this.data.isEdit) {
      //   this.dialogRef.close(this.userForm.value)
      // }
      console.log(this.userForm.value);

      this.dialogRef.close(this.userForm.value)
    }
  }
}
