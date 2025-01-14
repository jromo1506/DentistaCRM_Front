import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementMensajeComponent } from '../list-element-mensaje/list-element-mensaje.component';
import { SemaforoComponent } from '../../mensajes/semaforo/semaforo.component';
import { RouterModule } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
@Component({
  selector: 'app-list-mensaje',
  standalone: true,
  imports: [CommonModule, ListElementMensajeComponent, SemaforoComponent, RouterModule,NgxPaginationModule],
  templateUrl: './list-mensaje.component.html',
  styleUrls: ['./list-mensaje.component.scss']
})
export class ListMensajeComponent implements OnInit {
  p: number = 1;

  mensajes: any[] = [];

  constructor(private mensajeService:MensajesService) {}

  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe((mensajes:any[])=>{
      this.mensajes=mensajes;
    });
    this.mensajeService.obtenerMensjaes();
  }

  obtenerMensajes(): void {
  
    //aqui se manejara la logica cuando se obtenga desde la bd
    console.log('Mensajes obtenidos:', this.mensajes)
  }


  getMensajes():void{
    this.mensajeService.getMensajes().subscribe(res=>{
      this.mensajes=res;
      console.log(this.mensajes);
    })
  }

}
