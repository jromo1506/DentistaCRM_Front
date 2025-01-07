import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/components/form/form.component';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserViewComponent, FormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usuarios: Array<any> = [];
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private router: Router) {}

  cargarusuarios() {
    const usuariosGuardados = localStorage.getItem('usuario');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }


  ngOnInit() {
    this.usuarios = [
      {
        nombre: 'María García',
        tipo: 'Administrador',
        telefono: '555-1234'
      },
      {
        nombre: 'Luis Fernández',
        tipo: 'Usuario',
        telefono: '555-5678'
      },
      {
        nombre: 'Ana Torres',
        tipo: 'Invitado',
        telefono: '555-9101'
      }
    ];
    // Guardar datos de ejemplo en localStorage
    localStorage.setItem('usuario', JSON.stringify(this.usuarios));
    this.cargarusuarios();
  }

  editarPaciente(paciente: any) {
    this.formComponent.editarPacienteDesdeLista(paciente);
  }
}
