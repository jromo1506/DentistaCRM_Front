import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserViewComponent } from '../user-view/user-view.component';
import { FormUserComponent } from "../../../components/forms/form-user/form-user.component";
import { SwalService } from 'src/app/services/swal.service';
import { UserListElementComponent } from '../user-list-element/user-list-element.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule,UserListElementComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usuarios: Array<any> = [];
  @ViewChild(FormUserComponent) formUserComponent!: FormUserComponent;



     constructor(private swalService: SwalService, private loginService: LoginService, private router: Router) {
        if (!this.loginService.existeUsuario()) {
          // Si no está autenticado, redirigir al login
          this.router.navigate(['/login']);
        }
      }

  cargarusuarios() {
    const usuariosGuardados = localStorage.getItem('usuario');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }


  ngOnInit() {
    this.cargarusuarios();
  }

  eliminarUsuario(usuario: any) {
    console.log("Entro a eliminar al usuario: ", usuario.nombre)
    const usuariosGuardados = localStorage.getItem('usuario');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
      const usuariosActualizados = this.usuarios.filter(u => u.nombre !== usuario.nombre);
      localStorage.setItem('usuario', JSON.stringify(usuariosActualizados));
      this.swalService.success('Usuario eliminado correctamente');
    }
  }

  editarUsuario(usuario: any) {
    this.formUserComponent.editarUsuarioDesdeLista(usuario);
  }
}
