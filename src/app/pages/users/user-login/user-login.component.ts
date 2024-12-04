import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  constructor(private loginService: LoginService) {}

  onSubmit(event: Event): void {
  }
}
