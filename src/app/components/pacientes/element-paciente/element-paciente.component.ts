import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-element-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-paciente.component.html',
  styleUrls: ['./element-paciente.component.scss']
})
export class ElementPacienteComponent {
  @Input() paciente: any; // Recibe el paciente como entrada
  

  constructor(private router: Router, private pacientesService: PacientesService) {

  }

  verDetalles(paciente: any) {
    // Redirigimos a la página de detalles pasando el id del paciente
    this.router.navigate(['/perfil', "paciente", paciente.nombre]); // O usa 'paciente.id' si tienes un campo id único
  }


  verPerfil(idPaciente:string){
    this.router.navigate(['/perfil',"paciente",idPaciente])
  }

  eliminarPaciente() {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacientesService.eliminarPaciente(this.paciente._id).subscribe({
        next: () => {
          alert('Paciente eliminado correctamente.');
          // Aquí puedes actualizar la lista de pacientes o emitir un evento para que el padre actualice la lista
        },
        error: (err) => {
          alert('Error al eliminar el paciente: ' + err.message);
        }
      });
    }
  }
}
