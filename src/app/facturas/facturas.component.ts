import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FacturasService } from '../services/facturas.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthorizeService } from '../services/authorize.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '../models/LocalStorage';
import { Factura } from '../models/Factura';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { IDelete } from '../models/Usuario';
import { ConfirmComponent } from '../confirm/confirm.component';
import { InsertClienteComponent } from '../usuarios/insert-cliente/insert-cliente.component';
import { InsertFacturaComponent } from './insert-factura/insert-factura.component';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

export class FacturasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
displayedColumns: string[] = [
  "cliente",
  "folio",
  "saldo",
  "fecha_Facturacion",
  "fecha_Creacion",
  "acciones"
];


constructor(private facturasService: FacturasService,
  private dialog: MatDialog,
  private formBuilder: FormBuilder,
  private authService: AuthorizeService,
  private snackBar: MatSnackBar,
  ) {
   
  }
  User:LocalStorage;
  facturas: Factura[]=[];
  dataSource!: MatTableDataSource<Factura>;
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
  this.facturasService.getFacturas().subscribe((result)=>{
    if (result) {
      if(this.isClient){
        this.facturas = result.filter(x=>x.id_Usuario==this.User.idUsuario);
      }
      else{
        this.facturas=result;
      }
      this.dataSource = new MatTableDataSource<Factura>(this.facturas);
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
  let dialog = this.dialog.open(InsertFacturaComponent, {
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
        this.facturasService.DeleteFactura(POST).subscribe((result)=>{
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