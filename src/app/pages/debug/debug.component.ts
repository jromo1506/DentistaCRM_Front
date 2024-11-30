import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { MessageBoxComponent } from 'src/app/components/message-box/message-box.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

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
    ProductCardComponent
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
