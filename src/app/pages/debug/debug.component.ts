import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { FormComponent } from 'src/app/components/forms/form/form.component';
import { MessageBoxComponent } from 'src/app/components/message-box/message-box.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ListaPacientesComponent } from 'src/app/components/lista-pacientes/lista-pacientes.component';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    CommonModule,
    NotificationComponent,
    ModalComponent,
    FinderComponent,
    ListComponent,
    FormComponent,
    MessageBoxComponent,
    ProductCardComponent,
    ListaPacientesComponent
  ],
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent {
  isModalVisible: boolean = false;

  openModal() {
    this.isModalVisible = true;
  }

  onModalClose() {
    this.isModalVisible = false;
  }
}
