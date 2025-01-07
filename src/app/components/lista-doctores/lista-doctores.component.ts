import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementDoctorComponent } from '../element-doctor/element-doctor.component';

@Component({
  selector: 'app-lista-doctores',
  standalone: true,
  imports: [CommonModule, FormsModule, ElementDoctorComponent],
  templateUrl: './lista-doctores.component.html',
  styleUrls: ['./lista-doctores.component.scss']
})
export class ListaDoctoresComponent {
 pacientes: Array<any> = [];
  constructor(private router: Router) {}

  cargarPacientes() {
    const pacientesGuardados = localStorage.getItem('dotores');
    if (pacientesGuardados) {
      this.pacientes = JSON.parse(pacientesGuardados);
    }
  }

  ngOnInit() {
    

    this.pacientes = [
      {
        nombre: 'Dr. Juan Pérez',
        edad: 45,
        telefono: '555-1234',
        correo: 'juan.perez@clinica.com',
        especialidad: 'Cardiología'
      },
      {
        nombre: 'Dra. Ana López',
        edad: 38,
        telefono: '555-5678',
        correo: 'ana.lopez@hospital.com',
        especialidad: 'Pediatría'
      },
      {
        nombre: 'Dr. Carlos Martínez',
        edad: 50,
        telefono: '555-9101',
        correo: 'carlos.martinez@centromedico.com',
        especialidad: 'Neurología'
      }
    ];
    // Guardar datos de ejemplo en localStorage
    localStorage.setItem('dotores', JSON.stringify(this.pacientes));
  
    this.cargarPacientes();
  }
}
