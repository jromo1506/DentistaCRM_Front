import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pasarela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit{
  fecha: string | null = null;
  id: string | null = null;
  tipo: string | null = null;

  constructor(private route: ActivatedRoute) {}


  /*Formato de fecha
  1 L
  2 I
  3 G
  4 H
  5 T
  6 B
  7 O
  8 X
  9 M
  0 E

  2024-02-13
  IEIH-EI-LG
  */
 
  decryptDate(encryptedDate: string): string {
    const decryptMap: { [key: string]: string } = {
      'L': '1', 'I': '2', 'G': '3', 'H': '4', 'T': '5',
      'B': '6', 'O': '7', 'X': '8', 'M': '9', 'E': '0'
    };
  
    // Separar la fecha en partes Año-Mes-Día
    const parts = encryptedDate.split('-');
    if (parts.length !== 3) {
      throw new Error('Formato incorrecto. Usa el formato "AÑO-MES-DÍA" encriptado.');
    }
  
    // Desencriptar cada parte
    const year = parts[0].split('').map(char => decryptMap[char] ?? char).join('');
    const month = parts[1].split('').map(char => decryptMap[char] ?? char).join('');
    const day = parts[2].split('').map(char => decryptMap[char] ?? char).join('');
  
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const encryptedFecha = params.get('fecha');
      this.id = params.get('id');
      this.tipo = params.get('tipo');

      // Desencriptar la fecha si existe
      if (encryptedFecha) {
        this.fecha = this.decryptDate(encryptedFecha);

        // Verificar si la fecha ya pasó
        if (this.fecha && this.isExpired(this.fecha)) {
          Swal.fire({
            icon: 'error',
            title: 'Link vencido',
            text: `El link expiró el ${this.fecha}`,
            confirmButtonText: 'Entendido'
          });
        }
      }

      console.log('Fecha (Desencriptada):', this.fecha);
      console.log('ID:', this.id);
      console.log('Tipo:', this.tipo);
    });
  }

  private isExpired(dateString: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegura que solo se compare la fecha sin hora
  
    const [year, month, day] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day); // Meses en JavaScript van de 0 a 11
  
    console.log(inputDate);
    return inputDate < today; // Si la fecha es menor a hoy, está vencida
  }
  
}
