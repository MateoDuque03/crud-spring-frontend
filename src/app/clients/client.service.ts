import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './client';
import { CLIENTES } from './clients.json';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  constructor(private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  //Se utilizan los observable para peticiones asincronas con el fin de no bloquear la aplicación esperando la respuesta
  //Este es el observador y hay observadores pendientes de los cambios de este metodo los cuales se tiene que suscribir(Susbscribe())
  getClients(): Observable<Client[]>{
    // return of(CLIENTES);
    return this.http.get<Client[]>(this.urlEndPoint);
  }

  create(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders });
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`);
  }

  update(client: Client) : Observable<Client> {
    return this.http.put<Client>(this.urlEndPoint, client, {headers: this.httpHeaders });
  }

  delete(id: number) : Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders });
  }
}
