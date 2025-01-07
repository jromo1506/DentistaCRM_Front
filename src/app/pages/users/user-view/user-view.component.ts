import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {
  @Input() usuario: any; // Recibe el usuario como entrada
  @Output() editarUsuarioEvent = new EventEmitter<any>();

  constructor(private router: Router) {}

  verDetalles(usuario: any) {
    // Redirigimos a la página de detalles pasando el id del usuario
    this.router.navigate(['/perfil', "usuario", usuario.nombre]); // O usa 'usuario.id' si tienes un campo id único
  }

  editarUsuario() {
    this.editarUsuarioEvent.emit(this.usuario);
  }
}
