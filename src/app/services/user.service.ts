import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../models/worker-record.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: GlobalApiService, private http: HttpClient) {}

  // Agregar usuario
  addUser(nuevo: any): Observable<usuario> {
    return this.http.post<usuario>(`${this.api.getApiUrl()}/user/`, nuevo);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api.getApiUrl()}/user/`);
  }

  asignarPacientes(doctorId: string, pacienteIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.api.getApiUrl()}/user/asignarPacientes`, { doctorId, pacienteIds });
  }

  getIdsPacientes(idUsuario:string):Observable<any>{
    return this.http.get(this.api.getApiUrl() +"/getIdsPacientes/"+idUsuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api.getApiUrl()}/user/${id}`);
  }
  buscarPacientePorTelefono(telefono: string) {
    return this.http.get<any>(`/api/pacientes/buscar?telefono=${telefono}`);
  }

}
