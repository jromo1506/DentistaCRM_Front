import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() imageUrl: string = ''; // URL de la imagen del producto
  @Input() title: string = ''; // Título del producto
  @Input() price: number = 0; // Precio del producto
  @Input() discount: number = 0; // Descuento en porcentaje
  @Input() originalPrice: number = 0; // Precio original antes del descuento
  @Input() freeShipping: boolean = false; // Indica si el envío es gratis
}
