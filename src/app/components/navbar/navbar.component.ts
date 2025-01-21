import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuActive: boolean = false; // Control del menú en mobile
  isLoggedIn: boolean = false; // Estado de autenticación
  private authSubscription!: Subscription; // Subscripción para manejar el observable

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  // Método para cerrar sesión
  logout(): void {
    this.loginService.eliminarUsuario(); // Elimina al usuario del localStorage
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para abrir el menú en mobile
  openMobile(): void {
    $('#navbar-mobile').slideToggle(1000); // Usando jQuery para mostrar/ocultar el menú
  }

  // Método para navegar a una ruta específica
  navigate(ruta: string): void {
    this.router.navigate([ruta]); // Navegar a la ruta pasada como argumento
  }

  // Limpiar subscripción al destruir el componente
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
