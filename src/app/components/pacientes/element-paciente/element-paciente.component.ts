import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-element-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-paciente.component.html',
  styleUrls: ['./element-paciente.component.scss'],
})
export class ElementPacienteComponent {
  @Input() paciente: any;

  constructor(
    private router: Router,
    private pacientesService: PacientesService
  ) {}

  formatearFecha(fechaNacimiento: string): string {
    if (!fechaNacimiento) return 'No proporcionada';

    // Usar fecha en formato ISO (YYYY-MM-DD) sin ajustar por zona horaria
    const [año, mes, dia] = fechaNacimiento.split('T')[0].split('-');

    if (!año || !mes || !dia) return 'No proporcionada';

    return `${mes.padStart(2, '0')}/${dia.padStart(2, '0')}/${año}`;
  }

  verDetalles(paciente: any) {
    this.router.navigate(['/perfil', 'paciente', paciente.nombre]);
  }

  verPerfil(idPaciente: string) {
    this.router.navigate(['/perfil', 'paciente', idPaciente]);
  }

  eliminarPaciente() {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacientesService.eliminarPaciente(this.paciente._id).subscribe({
        next: () => {
          alert('Paciente eliminado correctamente.');
        },
        error: (err) => {
          alert('Error al eliminar el paciente: ' + err.message);
        },
      });
    }
  }
}
