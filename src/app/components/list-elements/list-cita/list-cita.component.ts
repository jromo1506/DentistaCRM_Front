import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementCitaComponent } from '../list-element-cita/list-element-cita.component';
import { SemaforoComponent } from "../../semaforo/semaforo.component";

@Component({
  selector: 'app-list-cita',
  standalone: true,
  imports: [CommonModule, ListElementCitaComponent, SemaforoComponent],
  templateUrl: './list-cita.component.html',
  styleUrls: ['./list-cita.component.scss']
})
export class ListCitaComponent {

}
