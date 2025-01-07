import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserViewComponent } from '../user-view/user-view.component';
import { FormUserComponent } from "../../../components/forms/form-user/form-user.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserViewComponent, FormUserComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usuarios: Array<any> = [];
  @ViewChild(FormUserComponent) formUserComponent!: FormUserComponent;
  constructor(private router: Router) {}

  cargarusuarios() {
    const usuariosGuardados = localStorage.getItem('usuario');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }


  ngOnInit() {
    this.cargarusuarios();
  }

  editarUsuario(usuario: any) {
    this.formUserComponent.editarUsuarioDesdeLista(usuario);
  }
}
