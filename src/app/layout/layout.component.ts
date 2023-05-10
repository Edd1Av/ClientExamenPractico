import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorage } from '../models/LocalStorage';
import { AuthorizeService } from '../services/authorize.service';

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
  isDevelop:Boolean=false;
  isNotRoot:Boolean;
  ngOnInit(): void {
    this.usuarioLoggeado = this.authService.isLogged();
    if(this.authService.usuarioData!=null){
      this.usuario=this.authService.usuarioData;
      this.email = this.usuario.correo;
      if(this.usuario.rol=="Administrador"){
        this.isAdmin=true;
        this.isDevelop=false;
      }
      else if(this.usuario.rol=="Desarrollador"){
        this.isAdmin=false;
        this.isDevelop=true;
      }
      else{
        this.isAdmin=false;
        this.isDevelop=false;
      }
    }

    if(this.email == "admin@admin.com"){
      this.isNotRoot = false;
    }
    else{
      this.isNotRoot = true;
    }
  }


  salir(){
    this.authService.logout();
  }

  // openDialog(): void {
  //   let dialog = this.dialog.open(ChangePasswordComponent, {
  //     width: "500px",
  //     disableClose: true,
  //   });
  //   dialog.afterClosed().subscribe((result) => {
      
  //   });
  // }

  // openDialogAdmin(): void {
  //   let dialog = this.dialog.open(AddAdministradorComponent, {
  //     width: "400px",
  //     disableClose: true,
  //   });
  //   dialog.afterClosed().subscribe((result) => {
      
  //   });
  // }

  // openDialogDeleteAdmin(): void {
  //   let dialog = this.dialog.open(DeleteAdministradorComponent, {
  //     width: "400px",
  //     disableClose: true,
  //   });
  //   dialog.afterClosed().subscribe((result) => {
      
  //   });
  // }
}
