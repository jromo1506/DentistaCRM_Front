import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() usuario: any; // Recibe datos del usuario desde el componente padre
  showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.showModal = false;
  }
}