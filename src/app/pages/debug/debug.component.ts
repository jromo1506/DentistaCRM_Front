import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { ListComponent } from 'src/app/components/list/list.component';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    CommonModule,
    NotificationComponent,
    ModalComponent,
    FinderComponent,
    ListComponent
  ],
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent {

}
