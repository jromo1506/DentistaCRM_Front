import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paciente-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.scss']
})
export class PacienteDetalleComponent {
  paciente: any; // El paciente seleccionado
  pacientes: Array<any> = []; // Lista de pacientes, que debe estar disponible de alguna manera

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Primero, obtenemos el nombre del paciente de la URL
    const pacienteId = this.route.snapshot.paramMap.get('id');

    // Cargamos los pacientes (por ejemplo, desde localStorage o servicio)
    const pacientesGuardados = localStorage.getItem('pacientes');
    if (pacientesGuardados) {
      this.pacientes = JSON.parse(pacientesGuardados);
    }

    // Buscamos el paciente que coincida con el id recibido
    this.paciente = this.pacientes.find(p => p.nombre === pacienteId); // O usa 'id' si usas un campo id único
  }
}
