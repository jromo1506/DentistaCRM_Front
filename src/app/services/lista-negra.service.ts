import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaNegraService {
  private listaSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  lista$: Observable<any[]> = this.listaSubject.asObservable();

  constructor(private http: HttpClient, private api: GlobalApiService) {}

  obtenerTodos(): void {
    this.http.get<any[]>(this.api.getApiUrl() + '/lista-negra').subscribe({
      next: (res) => this.listaSubject.next(res),
      error: (err) => console.error('Error obteniendo lista negra', err),
    });
  }

  agregarPaciente(paciente: any): Observable<any> {
    return this.http.post(this.api.getApiUrl() + '/lista-negra', paciente);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(this.api.getApiUrl() + '/lista-negra/' + id);
  }

  // También puedes actualizar el observable interno si quieres mantenerlo sincronizado:
  agregarYActualizar(paciente: any): Observable<any> {
    return this.agregarPaciente(paciente);
  }

  eliminarYActualizar(id: string): void {
    this.eliminar(id).subscribe(() => this.obtenerTodos());
  }
}

