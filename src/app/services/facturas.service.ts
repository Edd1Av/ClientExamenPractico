import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IDelete} from 'src/app/models/Usuario';
import {Response} from 'src/app/models/Response';
import { Factura } from '../models/Factura';
@Injectable({
  providedIn: 'root'
}) 



export class FacturasService {
  public urlBase: string;

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.urlBase = baseUrl;
  }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.urlBase + "api/Factura");
  }

  SetFactura(factura:Factura)  {
    //cliente.user=User;
      return this.http.post<Response>(this.urlBase + "api/Factura",factura);
    }

  DeleteFactura(FacturaDlt:IDelete): Observable<Response> {
      return this.http.post<Response>(this.urlBase + "api/Factura/delete",FacturaDlt);
  }
}