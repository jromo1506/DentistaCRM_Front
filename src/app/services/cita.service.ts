import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl: string;

  constructor(private http: HttpClient, private globalApi: GlobalApiService) {
    this.apiUrl = this.globalApi.getApiUrl();
  }

  obtenerCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas`);
  }
}
