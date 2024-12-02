import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-paciente.component.html',
  styleUrls: ['./element-paciente.component.scss']
})
export class ElementPacienteComponent {
  @Input() paciente: any; // Recibe el paciente como entrada

  constructor(private router: Router) {}
  verDetalles(paciente: any) {
    // Redirigimos a la página de detalles pasando el id del paciente
    this.router.navigate(['/detallespaciente', paciente.nombre]); // O usa 'paciente.id' si tienes un campo id único
  }
}
