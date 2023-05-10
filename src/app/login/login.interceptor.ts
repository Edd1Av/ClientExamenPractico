import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import { AuthorizeService } from '../services/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {

  // constructor(private authorize: AuthorizeService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let token = this.authorize.getToken();
  //   req = req.clone({
  //     setHeaders:{Authorization: "bearer " + token}
  //   });
  //   return next.handle(req).pipe(
  //     finalize(
  //       ()=>{
  //       }
  //     )
  //   );
  // }

  constructor(private usuarioService:AuthorizeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const usuario = this.usuarioService.usuarioData;
    if(usuario){
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${usuario.token}`
        }
      });
    }
    return next.handle(request);
  }
  
}