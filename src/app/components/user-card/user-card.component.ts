import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUser } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  //bind с значением user в шаблоне [] - то что в этих скобках то мы передаем
  @Input({ required: true }) user!: IUser
  @Output() deleteUser = new EventEmitter<IUser>()  //() в круглых скобках то что получаем или вызываем
  @Output() editUser = new EventEmitter<IUser>()

  onDeleteUser() {
    this.deleteUser.emit(this.user);
  }

  onEditUser() {
    this.editUser.emit(this.user);
  }

}
console.log("Get users card")