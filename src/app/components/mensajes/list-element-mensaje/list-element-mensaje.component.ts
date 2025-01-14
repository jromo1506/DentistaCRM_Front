import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemaforoComponent } from '../semaforo/semaforo.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-element-mensaje',
  standalone: true,
  imports: [CommonModule,SemaforoComponent],
  templateUrl: './list-element-mensaje.component.html',
  styleUrls: ['./list-element-mensaje.component.scss']
})
export class ListElementMensajeComponent {
  @Input() mensaje: any;
 
  
}
