import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente al paciente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',

    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.eliminarPaciente(this.paciente._id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El paciente fue eliminado correctamente.',
              icon: 'success',
              background: '#f0f4f8', // Color de fondo
              color: '#333333',
              confirmButtonColor: '#4caf50',
            });

          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el paciente: ' + err.message,
              icon: 'error',
            });
          },
        });
      }
    });
  }

}
