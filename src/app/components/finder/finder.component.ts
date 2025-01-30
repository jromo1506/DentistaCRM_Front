import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component'; // Ajusta la ruta según tu proyecto
import { CommonModule, NgFor, NgIf } from '@angular/common'; // Importamos directivas necesarias
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finder',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgFor, NgIf, FormsModule],
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {

  showModal: boolean = false;
  showResultsModal: boolean = false;
  searchQuery: string = '';
  results: string[] = [];

  toggleModal() {
    this.showModal = !this.showModal;
  }

  searchPatients() {
    this.showResultsModal = true;
    // Simulación de resultados de búsqueda
    this.results = [
      'Paciente 1 - Juan Pérez',
      'Paciente 2 - María Gómez',
      'Paciente 3 - Carlos López'
    ];
  }

  closeResultsModal() {
    this.showResultsModal = false;
  }

}
