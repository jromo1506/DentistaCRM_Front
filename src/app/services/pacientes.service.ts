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

}
