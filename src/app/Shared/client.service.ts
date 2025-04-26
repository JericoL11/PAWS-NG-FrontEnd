import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateOwner, OwnerDisplay } from '../models/owner';
import { Observable } from 'rxjs';
import { PagedResponse } from '../models/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  

  apiUrl = `${environment.apiBaseUrl}/Owners`;

  constructor(private http:HttpClient) { }

  //with search functiionalities
  getOwner(search: string = '', pageNo: number = 1, pageSize: number = 5): Observable<PagedResponse<OwnerDisplay>>{

    let params = new HttpParams()
    .set('search', search)
    .set('pageNo', pageNo)
    .set('pageSize', pageSize);

    return this.http.get<PagedResponse<OwnerDisplay>>(this.apiUrl, { params });
  }

  
  postOwner( data : CreateOwner): Observable<OwnerDisplay>{
    return this.http.post<OwnerDisplay>(this.apiUrl, data );
  }

}
