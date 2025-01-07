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
  @Input() paciente: any; // Recibe el paciente como entrada
  @Output() editarPacienteEvent = new EventEmitter<any>();

  constructor(private router: Router) {}


}
