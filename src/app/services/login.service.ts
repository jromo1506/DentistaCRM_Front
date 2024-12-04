import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(usuario: string, password: string): void {
    // Guardar los datos del usuario en localStorage, incluyendo la contraseña
    const userData = {
      usuario,
      password, // Contraseña almacenada directamente
      token: 'dummy-token', // Este es un token simulado
    };

    // Guardar en localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('Usuario logueado y datos guardados en localStorage');
  }

  getLoggedUser(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('userData');
    console.log('Usuario deslogueado');
  }
}
