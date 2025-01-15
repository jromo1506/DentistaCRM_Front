import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { CitaService } from 'src/app/services/cita.service';
import { FormsModule } from '@angular/forms';
import { Cita } from 'src/app/models/worker-record.model';

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

  citas: Cita[] = []; // Arreglo para almacenar las citas

  onCloseModal() {
    this.showModal = false;
  }

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacientesService,
    private citaService: CitaService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.getPacienteById(id).subscribe((res) => {
        this.paciente = res;
        this.obtenerCitasPorPaciente(id); // Filtrar citas por paciente
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
      fecha: new Date() 
    };

    this.citaService.addCita(nuevaCita).subscribe(
      (response) => {
        console.log('Cita creada:', response);
        alert('La cita se creó correctamente.');
        this.obtenerCitasPorPaciente(this.paciente._id); // Actualizar la lista de citas
      },
      (error: any) => {
        console.error('Error al crear la cita:', error);
        alert('No se pudo crear la cita. Por favor, inténtalo de nuevo.');
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
}
