import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorage } from '../models/LocalStorage';
import { AuthorizeService } from '../services/authorize.service';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private authService: AuthorizeService,
    ) { }

  usuario:LocalStorage;
  
  email:string;
  usuarioLoggeado:Boolean;
  isAdmin:Boolean=false;
  isGerente:Boolean=false;
  isClient:Boolean=false;
  isNotRoot:Boolean;
  ngOnInit(): void {
    this.usuarioLoggeado = this.authService.isLogged();
    if(this.authService.usuarioData!=null){
      this.usuario=this.authService.usuarioData;
      this.email = this.usuario.correo;
      if(this.usuario.rolId==ETipoUsuario.ADMINISTRADOR){
        this.isAdmin=true;
      }
      else if(this.usuario.rolId==ETipoUsuario.GERENTE){
        this.isGerente=true;
      }
      else if(this.usuario.rolId==ETipoUsuario.CLIENTE){
        this.isClient=true;
      }
    }

    if(this.usuario.idUsuario == 0){
      this.isNotRoot = false;
    }
    else{
      this.isNotRoot = true;
    }
  }


  salir(){
    this.authService.logout();
  }
}
