import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementTextComponent } from '../list-elements/list-element-text/list-element-text.component';
import { ListElementPhotoComponent } from '../list-elements/list-element-photo/list-element-photo.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,ListElementTextComponent,ListElementPhotoComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

}
