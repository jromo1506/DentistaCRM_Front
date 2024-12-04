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
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    const usuario = (document.getElementById('usuario') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (usuario && password) {
      this.loginService.login(usuario, password);
      alert('Inicio de sesión exitoso');
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
