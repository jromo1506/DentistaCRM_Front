import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  isAppointmentsCalendarVisible = false;
  isFullCalendarVisible = false;

  showAppointmentsCalendar() {
    this.isAppointmentsCalendarVisible = true;
    this.isFullCalendarVisible = false;
  }

  showFullCalendar() {
    this.isFullCalendarVisible = true;
    this.isAppointmentsCalendarVisible = false;
  }
}
