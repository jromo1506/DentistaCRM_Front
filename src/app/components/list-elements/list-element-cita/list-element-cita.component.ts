import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementPhotoComponent } from '../list-element-photo/list-element-photo.component';
import { SemaforoComponent } from '../../mensajes/semaforo/semaforo.component';

@Component({
  selector: 'app-list-element-cita',
  standalone: true,
  imports: [CommonModule,ListElementPhotoComponent, SemaforoComponent],
  templateUrl: './list-element-cita.component.html',
  styleUrls: ['./list-element-cita.component.scss']
})
export class ListElementCitaComponent {
  @Input() cita: any; // Recibe la cita como input

}
