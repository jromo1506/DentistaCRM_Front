// semaforo.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semaforo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semaforo.component.html',
  styleUrls: ['./semaforo.component.scss']
})
export class SemaforoComponent {
  @Input() status: number = 0; // Valor por defecto

  // Mapea cada estado al color correspondiente
  colors: { [key: number]: string } = {
    0: 'gray',
    1: 'green',
    2: 'yellow',
    3: 'red'
  };

  // Obtiene el color activo basado en el estado
  get activeColor(): string {
    return this.colors[this.status] || 'gray';
  }
}
