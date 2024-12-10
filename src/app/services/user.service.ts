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

 
}
