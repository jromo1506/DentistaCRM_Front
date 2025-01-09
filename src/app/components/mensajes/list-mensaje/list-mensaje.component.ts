import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementMensajeComponent } from '../list-element-mensaje/list-element-mensaje.component';
import { SemaforoComponent } from '../../mensajes/semaforo/semaforo.component';
import { RouterModule } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-mensaje',
  standalone: true,
  imports: [CommonModule, ListElementMensajeComponent, SemaforoComponent, RouterModule],
  templateUrl: './list-mensaje.component.html',
  styleUrls: ['./list-mensaje.component.scss']
})
export class ListMensajeComponent implements OnInit {
  mensajes: any[] = [
    {
      telefono: '123456789',
      nombre: 'Juan Pérez',
      fecha: '2025-01-10',
      hora: '10:00 AM',
      descripcion: 'Consulta general...',
      status: 0
    },
    {
      telefono: '987654321',
      nombre: 'María López',
      fecha: '2025-01-12',
      hora: '02:30 PM',
      descripcion: 'Revisión dental...',
      status: 3
    },
    {
      telefono: '456789123',
      nombre: 'Carlos García',
      fecha: '2025-01-15',
      hora: '11:00 AM',
      descripcion: 'Control de peso...',
      status: 1
    }
  ];

  constructor(private mensajeService: MessageService) {}

  ngOnInit(): void {
    this.obtenerMensajes();
  }

  obtenerMensajes(): void {
    //aqui se manejara la logica cuando se obtenga desde la bd
    console.log('Mensajes obtenidos:', this.mensajes)
  }

}
