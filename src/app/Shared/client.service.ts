import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateOwner, OwnerDisplay } from '../models/owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  

  apiUrl = `${environment.apiBaseUrl}/Owners`;

  constructor(private http:HttpClient) { }

  getOwner(): Observable<OwnerDisplay[]>{
    return this.http.get<OwnerDisplay[]>(this.apiUrl);
  }

  postOwner( data : CreateOwner): Observable<OwnerDisplay>{
    return this.http.post<OwnerDisplay>(this.apiUrl, data );
  }

}
