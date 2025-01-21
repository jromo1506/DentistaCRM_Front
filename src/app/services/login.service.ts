import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalApiService } from './global-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarioKey = 'usuario'; // Clave que usarás en el localStorage
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.existeUsuario()); // Estado inicial basado en el localStorage

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable(); // Observable para exponer el estado

  constructor(private http: HttpClient, private api: GlobalApiService) {}

  // Método para autenticar al usuario
  autenticarUsuario(datos: { usuario: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api.getApiUrl()}/userAuth`, datos);
  }

  // Guardar usuario en localStorage
  guardarUsuario(usuario: { id: string; usuario: string; tipo: string; telefono: number }): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
    this.isLoggedInSubject.next(true); // Actualiza el estado de autenticación
  }

  // Leer usuario desde localStorage
  obtenerUsuario(): { id: string; usuario: string; tipo: string; telefono: number } | null {
    const usuario = localStorage.getItem(this.usuarioKey);
    return usuario ? JSON.parse(usuario) : null;
  }

  // Actualizar los datos del usuario en localStorage
  actualizarUsuario(usuario: { id: string; usuario: string; tipo: string; telefono: number }): void {
    this.guardarUsuario(usuario); // Actualiza y guarda
  }

  // Eliminar usuario de localStorage
  eliminarUsuario(): void {
    localStorage.removeItem(this.usuarioKey);
    this.isLoggedInSubject.next(false); // Actualiza el estado de autenticación
  }

  // Comprobar si el usuario existe en localStorage
  existeUsuario(): boolean {
    return localStorage.getItem(this.usuarioKey) !== null;
  }
}
