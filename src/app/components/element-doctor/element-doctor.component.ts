import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-doctor.component.html',
  styleUrls: ['./element-doctor.component.scss']
})
export class ElementDoctorComponent {
  @Input() doctor: any; // Recibe el doctor como entrada
  @Output() editarDoctorEvent = new EventEmitter<any>();
  @Output() eliminarDoctorEvent = new EventEmitter<any>();

  constructor(private router: Router) {}

  verDetalles(doctor: any) {
    // Redirigimos a la página de detalles pasando el id del doctor
    this.router.navigate(['/perfil', "doctor", doctor.nombre]); // O usa 'doctor.id' si tienes un campo id único
  }

  eliminarDoctor() {
    this.eliminarDoctorEvent.emit(this.doctor);
  }

  editarDoctor() {
    this.editarDoctorEvent.emit(this.doctor);
  }
}
