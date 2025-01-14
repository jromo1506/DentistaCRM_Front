import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-filtros-mensajes',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './filtros-mensajes.component.html',
  styleUrls: ['./filtros-mensajes.component.scss']
})
export class FiltrosMensajesComponent {
  filterForm:FormGroup;
  @Output() urlFiltros: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb:FormBuilder,private mensajeService:MensajesService) {
    this.filterForm = this.fb.group({
      estado: [''], // Default value
      orden: [''], // Default value
      telefono: ['']
    });

    
  }


  obtenerFiltros(){
    const formValues = this.filterForm.value; // Obtener los valores del formulario
    let queryParams = '';

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key]; // Obtener el valor del campo
      if (value && value.trim() !== '') { // Verificar si no está vacío
        queryParams += queryParams ? `&${key}=${value}` : `?${key}=${value}`;
      }
    });
    this.mensajeService.obtenerMensajesFiltrados(queryParams);
  }





}
