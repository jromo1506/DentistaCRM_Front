import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {

    constructor(private loginService: LoginService, private router: Router) {
      if (!this.loginService.existeUsuario()) {
        // Si no está autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    }
}
