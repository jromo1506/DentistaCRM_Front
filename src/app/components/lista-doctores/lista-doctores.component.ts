import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementDoctorComponent } from '../element-doctor/element-doctor.component';
import { FormDoctorComponent } from "../forms/form-doctor/form-doctor.component";

@Component({
  selector: 'app-lista-doctores',
  standalone: true,
  imports: [CommonModule, FormsModule, ElementDoctorComponent, FormDoctorComponent],
  templateUrl: './lista-doctores.component.html',
  styleUrls: ['./lista-doctores.component.scss']
})
export class ListaDoctoresComponent {
  doctores: Array<any> = [];
  @ViewChild(FormDoctorComponent) formDoctorComponent!: FormDoctorComponent;
  constructor(private router: Router) {}

  cargarDoctores() {
    const doctoresGuardados = localStorage.getItem('dotores');
    if (doctoresGuardados) {
      this.doctores = JSON.parse(doctoresGuardados);
    }
  }

  ngOnInit() {
    this.cargarDoctores();
  }

  editarDoctor(doctor: any) {
    this.formDoctorComponent.editarDoctorDesdeLista(doctor);
  }
}
