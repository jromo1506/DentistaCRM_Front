import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ModalComponent } from '../../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ListaNegraService } from 'src/app/services/lista-negra.service';

@Component({
  selector: 'app-element-paciente',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './element-paciente.component.html',
  styleUrls: ['./element-paciente.component.scss'],
})
export class ElementPacienteComponent {
  @Input() paciente: any;
  user: any;
  usuarioActual: any;
  showListaNegraModal = false;
  razon = '';
  detalles = '';
  tipo = 'permanente';
  pacientesEnListaNegra: any[] = [];
  private limpiarFormulario(): void {
    this.razon = '';
    this.detalles = '';
    this.tipo = 'permanente';
  }
  constructor(
    private router: Router,
    private pacientesService: PacientesService,
    private listaNegraService: ListaNegraService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.pacientesService.obtenerPacientesEnListaNegra().subscribe({
      next: (pacientes) => {
        this.pacientesEnListaNegra = pacientes;
      },
      error: (err) => {
        console.error('Error al obtener pacientes en lista negra', err);
      }
    });
    const userData = this.loginService.obtenerUsuario();
    console.log(userData, "User desde componente paciente");

    this.user = userData?.usuario; // o ajusta según cómo esté estructurado
  }
  estaEnListaNegra(pacienteId: string): boolean {
    return this.pacientesEnListaNegra.some((paciente) => paciente._id === pacienteId);
  }

  abrirListaNegra(paciente: any) {
    this.paciente = paciente; // por si en el futuro cambia el contexto
    this.showListaNegraModal = true;
    this.limpiarFormulario(); // limpia el formulario cada vez
  }

  onCloseListaNegraModal() {
    this.showListaNegraModal = false;
    this.limpiarFormulario();
  }

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


  agregarListaNegra() {
    const datos = {
      pacienteId: this.paciente._id,
      razon: this.razon,
      detalles: this.detalles,
      tipo: this.tipo,
      evidencia: [],
      agregadoPor: this.user.id || this.user._id
    };

    console.log('Enviando a lista negra:', datos);

    this.listaNegraService.agregarPaciente(datos).subscribe({
      next: (res) => {
        console.log('Paciente agregado a lista negra:', res);
        this.showListaNegraModal = false;

        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Paciente agregado a lista negra',
          text: 'El paciente ha sido agregado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error('Error al agregar a lista negra', err);

        // Mostrar alerta si ya está en lista negra
        if (err.status === 400 && err.error.message === 'Paciente ya está en lista negra') {
          Swal.fire({
            icon: 'warning',
            title: 'El paciente ya está en la lista negra',
            text: 'Este paciente ya ha sido agregado previamente.',
            confirmButtonText: 'Aceptar'
          });
        } else {
          // Mostrar alerta genérica de error
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar paciente',
            text: 'Ocurrió un problema al intentar agregar al paciente.',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
  }


  }


