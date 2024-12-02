import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { PacienteDetalleComponent } from '../paciente-detalle/paciente-detalle.component';
import { Router } from '@angular/router';
import { ElementPacienteComponent } from '../element-paciente/element-paciente.component';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ElementPacienteComponent],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  pacientes: Array<any> = [];

  constructor(private router: Router) {}

  cargarPacientes() {
    const pacientesGuardados = localStorage.getItem('pacientes');
    if (pacientesGuardados) {
      this.pacientes = JSON.parse(pacientesGuardados);
    }
  }

  verDetalles(paciente: any) {
    // Redirigimos a la página de detalles pasando el id del paciente
    this.router.navigate(['/detallespaciente', paciente.nombre]); // O usa 'paciente.id' si tienes un campo id único
  }

  ngOnInit() {
    this.cargarPacientes();
  }
}
