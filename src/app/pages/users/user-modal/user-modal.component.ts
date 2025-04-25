import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() usuario: any; // Recibe datos del usuario desde el componente padre
  showModal: boolean = false;
  pacientes: any[] = []; // Almacena la lista de pacientes

  constructor(private pacientesService: PacientesService, private userService: UserService
  ) { }

  ngOnInit(): void {
    // Cargar pacientes cuando se inicializa el componente
    this.pacientesService.paciente$.subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
    this.pacientesService.obtenerPacientes();
  }

  closeModal() {
    this.showModal = false;
  }

  asignarPaciente(pacienteId: string) {
    if (!pacienteId) {
      alert('Por favor, selecciona un paciente');
      return;
    }

    // Verificar si el paciente ya está asignado
    if (this.usuario.idPacientes.includes(pacienteId)) {
      Swal.fire('Paciente ya asignado', 'Este paciente ya está asignado a este doctor.', 'warning');
      return;
    }




    this.userService.asignarPacientes(this.usuario._id, [pacienteId]).subscribe({
      next: (response) => {
        console.log('Paciente asignado exitosamente:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Paciente asignado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        // Actualizar la lista de pacientes del doctor
        this.usuario.idPacientes.push(pacienteId);
      },
      error: (error) => {
        console.error('Error al asignar paciente:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al asignar paciente',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }


}
