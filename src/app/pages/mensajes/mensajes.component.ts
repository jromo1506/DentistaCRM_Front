import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMensajeComponent } from 'src/app/components/mensajes/list-mensaje/list-mensaje.component';
import { ListElementMensajeComponent } from 'src/app/components/mensajes/list-element-mensaje/list-element-mensaje.component';
import { FiltrosMensajesComponent } from 'src/app/components/mensajes/filtros-mensajes/filtros-mensajes.component';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule,ListMensajeComponent,ListElementMensajeComponent,FiltrosMensajesComponent],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent {
  mensaje: any[]=[];
  

}
