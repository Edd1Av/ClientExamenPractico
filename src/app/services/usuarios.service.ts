import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario, IDelete} from 'src/app/models/Usuario';
import {Response} from 'src/app/models/Response';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';
@Injectable({
  providedIn: 'root'
}) 



export class UsuariosService {
  public urlBase: string;

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.urlBase = baseUrl;
  }

  getClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase + "api/Usuario/clientes");
  }

  SetCliente(cliente:Usuario)  {
    //cliente.user=User;
      cliente.tipo_Usuario=ETipoUsuario.CLIENTE;
      return this.http.post<Response>(this.urlBase + "api/Usuario",cliente);
    }

  DeleteCliente(ClienteDlt:IDelete): Observable<Response> {
      return this.http.post<Response>(this.urlBase + "api/Usuario/delete",ClienteDlt);
  }
}