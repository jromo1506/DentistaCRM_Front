import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ListaNegraService } from 'src/app/services/lista-negra.service';
import { CitaService } from 'src/app/services/cita.service';
import { FormsModule } from '@angular/forms';
import { Cita } from 'src/app/models/worker-record.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  showModal: boolean = false;
  paciente: any;
  tratamiento: string = '';
  observaciones: string = '';
  realizo: string = '';
  pago: number = 0;
  horaInicio: string = '';
  horaFin: string = '';
  fechaCita: Date = new Date();
  listaNegra: any = null;
  citas: Cita[] = []; // Arreglo para almacenar las citas

  onCloseModal() {
    this.showModal = false;
  }

    constructor(
      private loginService: LoginService,
      private router: Router,
      private route: ActivatedRoute,
      private pacienteService: PacientesService,
      private listaNegraService: ListaNegraService,
      private citaService: CitaService) {
      if (!this.loginService.existeUsuario()) {
        // Si no está autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pacienteService.getPacienteById(id).subscribe((res) => {
          this.paciente = res;
          this.obtenerCitasPorPaciente(id); // Filtrar citas por paciente

          this.listaNegraService.getDatosListaNegraPorPaciente(id).subscribe((res) => {
            if (res.enListaNegra) {
              this.listaNegra = res.datos;
            }
          });
        });
      }
    }

  obtenerCitasPorPaciente(id: string) {
    this.citaService.getCitasPorPaciente(id).subscribe(
      (response: Cita[]) => {
        this.citas = response;
      },
      (error) => {
        console.error('Error al obtener citas del paciente:', error);
      }
    );
  }

  register() {
    this.showModal = true;
  }

  nuevaCita() {
    const nuevaCita = {
      pacienteId: this.paciente._id,  // Se añade el pacienteId desde el objeto paciente cargado
      tratamiento: this.tratamiento,
      observaciones: this.observaciones || '',
      realizo: this.realizo || '',
      pago: this.pago || 0,
      horaInicio: this.horaInicio || '',
      horaFin: this.horaFin || '',
      fechaCita: this.fechaCita || ''
      ,
      fecha: new Date()

    };

    this.citaService.addCita(nuevaCita).subscribe(
      (response) => {
        console.log('Cita creada:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Cita creada!',
          text: 'La cita se creó correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        this.obtenerCitasPorPaciente(this.paciente._id); // Actualizar la lista de citas
      },
      (error: any) => {
        console.error('Error al crear la cita:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la cita. Por favor, inténtalo de nuevo.',
          confirmButtonText: 'Entendido'
        });
      }
    );
  }


  obtenerCitas() {
    this.citaService.getCita().subscribe(
      (response: Cita[]) => {
        this.citas = response; // Guardar las citas obtenidas
        console.log('Citas:', this.citas); // Solo para depuración
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
        alert('Error al obtener las citas.');
      }
    );
  }
  calcularEdad(fechaNacimiento: string): number {
    if (!fechaNacimiento) return 0;

    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  guardarAlergias() {
    this.pacienteService.guardarAlergias(this.paciente._id, { alergias: this.paciente.alergias }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Alergias actualizadas correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al guardar alergias:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron guardar las alergias',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }

  guardarMedicamentos() {
    this.pacienteService.guardarMedicamentos(this.paciente._id, { medicamentos: this.paciente.medicamentos }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Medicamentos actualizados correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al guardar medicamentos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron guardar los medicamentos',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }

  abrirChat(paciente: any) {
    localStorage.setItem('chat-telefono', paciente.telefonoWhatsapp);
    this.router.navigate(['/chats']);
  }

  eliminarDeListaNegra(): void {
    if (!this.paciente || !this.paciente._id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al paciente de la lista negra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaNegraService.removerPacienteYActualizar(this.paciente._id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El paciente ha sido eliminado de la lista negra.', 'success');
            this.listaNegra = null;
            this.paciente.enListaNegra = false;
          },
          error: (err) => {
            console.error('Error al eliminar de lista negra:', err);
            Swal.fire('Error', 'No se pudo eliminar al paciente de la lista negra.', 'error');
          }
        });
      }
    });
  }
  }




