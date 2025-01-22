import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementMensajeComponent } from '../list-element-mensaje/list-element-mensaje.component';
import { SemaforoComponent } from '../../mensajes/semaforo/semaforo.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-mensaje',
  standalone: true,
  imports: [CommonModule, ListElementMensajeComponent, RouterModule, NgxPaginationModule],
  templateUrl: './list-mensaje.component.html',
  styleUrls: ['./list-mensaje.component.scss']
})
export class ListMensajeComponent implements OnInit {
  p: number = 1;
  mensajes: any[] = [];
  usuarioId: string | null = null;

  constructor(
    private mensajeService: MensajesService,
    private route: ActivatedRoute // Inyectamos ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el usuarioId de la URL
    this.route.paramMap.subscribe(params => {
      this.usuarioId = params.get('id'); // Obtener el id del usuario
      console.log('ID del usuario desde la URL:', this.usuarioId);

      if (this.usuarioId) {
        // Pasar el usuarioId al servicio para obtener los mensajes
        this.mensajeService.getMensajes(this.usuarioId).subscribe((mensajes: any[]) => {
          this.mensajes = mensajes;
          console.log('Mensajes cargados:', mensajes);
        });
      }
    });
  }

  obtenerMensajes(): void {
    console.log('Mensajes obtenidos:', this.mensajes);
  }
}
