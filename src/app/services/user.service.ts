import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: GlobalApiService, private http: HttpClient) {}

  addUser(users: any): Observable<any>{
    return this.http.post(this.api.getApiUrl() + '/user/', users);
  }

  deleteUsers(){

  }

  getUsers(){

  }

}
