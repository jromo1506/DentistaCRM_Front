import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private mensajesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  mensaje$:Observable<any[]>= this.mensajesSubject.asObservable();

  constructor(private api:GlobalApiService,private http:HttpClient) { }


  getMensajes():Observable<any>{
    return this.http.get(this.api.getApiUrl() + "/getMensajes");
  }


  obtenerMensjaes(){
    this.http.get(this.api.getApiUrl() + "/getMensajes").subscribe((res:any)=>{
      this.mensajesSubject.next(res);
    });
  }

  obtenerMensajesFiltrados(URLFiltros:String){
    this.http.get(this.api.getApiUrl() + "/getMensajes"+URLFiltros).subscribe((res:any)=>{
      this.mensajesSubject.next(res);
    });
  }


  




}
