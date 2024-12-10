import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalApiService } from './global-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private api: GlobalApiService) {}

  // Método para autenticar al usuario
  autenticarUsuario(datos: { usuario: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api.getApiUrl()}/usuarios/auth`, datos);
  }
}
