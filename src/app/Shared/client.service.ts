import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { OwnerDisplayDto } from '../models/owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  ListOwner: OwnerDisplayDto[] = [];

  apiUrl = `${environment.apiBaseUrl}/Owners`;

  constructor(private http:HttpClient) { }

  getOwner(): Observable<OwnerDisplayDto[]>{
    return this.http.get<OwnerDisplayDto[]>(this.apiUrl);
  }
}
