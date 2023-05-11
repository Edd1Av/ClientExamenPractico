import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../services/authorize.service';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  
  constructor(private authorize: AuthorizeService, private router: Router) {
  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      let user = this.authorize.isLoggedIn()
      if(user){
        // if (user.rolId==ETipoUsuario.ADMINISTRADOR){
        //   return true;
        // }
        // else if(user.rolId==ETipoUsuario.GERENTE){
        //   return true;
        // }
        // else{
        //   this.router.navigate(['/Usuarios']);
        //   return false;
        // }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
  
}
