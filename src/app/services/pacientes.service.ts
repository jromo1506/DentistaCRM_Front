import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {


  private pacientesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paciente$:Observable<any[]> = this.pacientesSubject.asObservable();

  constructor(private api:GlobalApiService,private http:HttpClient) { }

  obtenerPacientes(){
    this.http.get(this.api.getApiUrl() + "/pacientes").subscribe((res:any)=>{
      this.pacientesSubject.next(res);
    });
  }







  // _____________________________________________________________________________

  getPacienteById(id:String):Observable<any>{
    return this.http.get(this.api.getApiUrl()+"/paciente/"+id);
  }


  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(this.api.getApiUrl() + "/paciente/" + id);
  }

  guardarAlergias(id: string, data: any) {
    return this.http.put(this.api.getApiUrl() +`/paciente/${id}/alergias`, data);
  }

  guardarMedicamentos(id: string, data: any) {
    return this.http.put(this.api.getApiUrl() +`/paciente/${id}/medicamentos`, data);
  }

  buscarPorTelefono(telefono: string): Observable<any> {
    return this.http.get(this.api.getApiUrl() + `/buscarPacientePorTelefono/${telefono}`);
  }

  actualizarLista(pacientes: any[]) {
    this.pacientesSubject.next(pacientes);
  }

  esPacienteEnListaNegra(pacienteId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api.getApiUrl()}/lista-negra/verificar/${pacienteId}`);
  }

  obtenerPacientesEnListaNegra(): Observable<any[]> {
    return this.http.get<any[]>(this.api.getApiUrl() + "/pacientes/lista-negra");
  }
}
