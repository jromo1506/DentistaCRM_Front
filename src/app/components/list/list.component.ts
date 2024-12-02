import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementPhotoComponent } from '../list-elements/list-element-photo/list-element-photo.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,ListElementPhotoComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

}
