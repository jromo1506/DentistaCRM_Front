import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

    constructor(private loginService: LoginService, private router: Router) {
      if (!this.loginService.existeUsuario()) {
        // Si no está autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    }

  showAppointmentsCalendar() {
    this.isAppointmentsCalendarVisible = true;
    this.isFullCalendarVisible = false;
  }

  showFullCalendar() {
    this.isFullCalendarVisible = true;
    this.isAppointmentsCalendarVisible = false;
  }
}
