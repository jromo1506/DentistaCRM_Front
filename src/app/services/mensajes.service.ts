import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private api:GlobalApiService,private http:HttpClient) { }


  getMensajes():Observable<any>{
    return this.http.get(this.api.getApiUrl() + "/getMensajes");
  }

}
