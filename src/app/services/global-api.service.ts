import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalApiService {
  constructor() {}
  private url: string = 'http://localhost:5000/DentalArce'; 

  getApiUrl() {
    return this.url;
  }
}
