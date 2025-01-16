import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalApiService } from './global-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private usuarioKey = 'usuario'; // Clave que usarás en el localStorage

  
  constructor(private http: HttpClient, private api: GlobalApiService) {}

  // Método para autenticar al usuario
  autenticarUsuario(datos: { usuario: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api.getApiUrl()}/usuarios/auth`, datos);
  }

  // Guardar usuario en localStorage
  guardarUsuario(usuario: { id: string, usuario: string, tipo: string, telefono: number }): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  // Leer usuario desde localStorage
  obtenerUsuario(): { id: string, usuario: string, tipo: string, telefono: number } | null {
    const usuario = localStorage.getItem(this.usuarioKey);
    return usuario ? JSON.parse(usuario) : null;
  }

  // Actualizar los datos del usuario en localStorage
  actualizarUsuario(usuario: { id: string, usuario: string, tipo: string, telefono: number }): void {
    this.guardarUsuario(usuario);  // Llamada a guardar, ya que el "actualizar" básicamente es un reemplazo.
  }

  // Eliminar usuario de localStorage
  eliminarUsuario(): void {
    localStorage.removeItem(this.usuarioKey);
  }

  // Comprobar si el usuario existe en localStorage
  existeUsuario(): boolean {
    return localStorage.getItem(this.usuarioKey) !== null;
  }
}
