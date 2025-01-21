import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService); // Inyecta el servicio LoginService

  if (loginService.existeUsuario()) {
    // Si el usuario está logueado, permite el acceso
    return true;
  } else {
    // Si no está logueado, redirige al login (puedes personalizar la URL)
    window.location.href = '/login'; // O usa un Router para redirigir si prefieres
    return false;
  }
};
