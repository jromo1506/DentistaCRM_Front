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

  credentials:any;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        var user= this.loginService.obtenerUsuario();
        console.log(user,"User");
        
        this.credentials = user?.usuario;
        console.log(this.credentials,"CREDENTIALS");
      }
    );
  }

  // Método para cerrar sesión
  logout(): void {
    this.loginService.eliminarUsuario(); // Elimina al usuario del localStorage
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para abrir el menú en mobiles
  openMobile(): void {
    $('#navbar-mobile').slideToggle(1000); // Usando jQuery para mostrar/ocultar el menú
  }

  navigate(ruta: string): void {

    if (ruta === '/lista-mensajes' && this.credentials) {
      console.log(this.credentials,"CREDENTIALS");
      // Si la ruta es lista-mensajes, pasar el id del usuario en la URL
      this.router.navigate([ruta],{ queryParams: this.credentials });
    } else {
      console.log(this.credentials.id,"ID");
      // En otros casos, simplemente navegar a la ruta
      this.router.navigate([ruta]);
    }
  }

  getUsuarioId(): string | null {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      return usuario.usuario.id; // Asegúrate de que este campo coincida con la estructura del objeto almacenado
    }
    return null;
  }
  
  
  // Limpiar subscripción al destruir el componente
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
