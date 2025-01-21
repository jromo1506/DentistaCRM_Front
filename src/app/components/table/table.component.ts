import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [], // Importa el DropdownComponent
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

   constructor(private loginService: LoginService, private router: Router) {
        if (!this.loginService.existeUsuario()) {
          // Si no está autenticado, redirigir al login
          this.router.navigate(['/login']);
        }
      }
  

}
