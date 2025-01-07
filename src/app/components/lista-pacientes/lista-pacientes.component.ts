import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementPacienteComponent } from '../element-paciente/element-paciente.component';
import { FormComponent } from '../forms/form/form.component';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ElementPacienteComponent, FormComponent],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  pacientes: Array<any> = [];
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private router: Router) {}

  cargarPacientes() {
    const pacientesGuardados = localStorage.getItem('pacientes');
    if (pacientesGuardados) {
      this.pacientes = JSON.parse(pacientesGuardados);
    }
  }


  ngOnInit() {
    this.cargarPacientes();
  }

  editarPaciente(paciente: any) {
    this.formComponent.editarPacienteDesdeLista(paciente);
  }
}
