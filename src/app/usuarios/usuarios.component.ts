import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from '../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthorizeService } from '../services/authorize.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '../models/LocalStorage';
import { IDelete, Usuario } from '../models/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';
import { LoginComponent } from '../login/login.component';
import { InsertClienteComponent } from './insert-cliente/insert-cliente.component';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
displayedColumns: string[] = [
  "nombre",
  "apellido",
  "edad",
  "correo_electronico",
  "acciones"
];


constructor(private usuariosService: UsuariosService,
  private dialog: MatDialog,
  private formBuilder: FormBuilder,
  private authService: AuthorizeService,
  private snackBar: MatSnackBar
  ) {
   
  }
  User:LocalStorage;
  clientes: Usuario[]=[];
  dataSource!: MatTableDataSource<Usuario>;
  formGroup: any;
  isAdmin:Boolean=false;
  isGerente:Boolean=false;
  isClient:Boolean=false;

ngOnInit(): void {
  if(this.authService.usuarioData!=null){
    this.User=this.authService.usuarioData;
    if(this.User.rolId==ETipoUsuario.ADMINISTRADOR){
      this.isAdmin=true;
    }
    else if(this.User.rolId==ETipoUsuario.GERENTE){
      this.isGerente=true;
    }
    else if(this.User.rolId==ETipoUsuario.CLIENTE){
      this.isClient=true;
    }
  }

  this.actualizarHistorico();
  this.buildForm();
  this.initializeFormGroup();
}


actualizarHistorico() {

  this.usuariosService.getClientes().subscribe((result)=>{
    if (result) {
      this.clientes = result;
        this.dataSource = new MatTableDataSource<Usuario>(this.clientes);
        this.dataSource.paginator = this.paginator;
    } else {
      this.openSnackBar("Error");
    }
  });
}

private buildForm() {
  this.formGroup = this.formBuilder.group({
    buscador: new FormControl(""),
  });
}

initializeFormGroup() {
  this.formGroup.setValue({
    buscador: "",
  });
}

filtrarTabla() {
  this.dataSource.filter = this.formGroup.get("buscador").value;
}


openDialogInsert(): void {
  let dialog = this.dialog.open(InsertClienteComponent, {
    width: "800px",
    disableClose: true,
  });
  dialog.afterClosed().subscribe((result) => {
    this.actualizarHistorico();
    this.filtrarTabla();
  });
}

mostrarDialogo(id:number): void {
  let POST:IDelete={
    user:this.User.correo,
    id:id,
  }
  this.dialog
    .open(ConfirmComponent, {
      data: `¿Está seguro de eliminar a este cliente?`,
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.usuariosService.DeleteCliente(POST).subscribe((result)=>{
          if (result.success) {
            this.actualizarHistorico();
            this.openSnackBar(result.content);
          } else {
            this.openSnackBar(result.content);
          }
        });
      }
    });
}

openSnackBar(message:string) {
  this.snackBar.open(message, undefined, {
    duration: 3000,
  });
}

}
