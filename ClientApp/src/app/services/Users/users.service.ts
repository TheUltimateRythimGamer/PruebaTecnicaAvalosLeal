import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({

    }),
  };

  constructor(protected http: HttpClient) { }

  guardar(json: any): Observable<any> {
    return this.http.post<any>(`${environment.serverAPIURL}/Users`, json, this.httpOptions);
  }

  loadData(): Observable<any> {
    return this.http.get<any>(`${environment.serverAPIURL}/Users`, this.httpOptions);
  }

  loadDataById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.serverAPIURL}/Users/${id}`, this.httpOptions);
  }

  Eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.serverAPIURL}/Users/${id}`, this.httpOptions);
  }

}
