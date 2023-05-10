import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { LocalStorage } from 'src/app/models/LocalStorage';
import { Usuario } from 'src/app/models/Usuario';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-insert-factura',
  templateUrl: './insert-factura.component.html',
  styleUrls: ['./insert-factura.component.css']
})


export class InsertFacturaComponent implements OnInit {

  formGroup!: FormGroup;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private matDialogref: MatDialogRef<InsertFacturaComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthorizeService,
    private _facturasService: FacturasService,
    private _usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) { }
  User:LocalStorage;
  clientes: Usuario[]=[];
  ngOnInit(): void {
  this.GetClientes();
  this.buildForm();
  if(this.authService.usuarioData!=null){
    this.User=this.authService.usuarioData;
  }

  
  }

  private GetClientes(){
    this._usuariosService.getClientes()
    .pipe(
      tap((result:Usuario[])=>{
        this.clientes=result;
      })
    ).subscribe();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id_usuario: new FormControl("", Validators.required),
      folio: new FormControl("", Validators.required),
      saldo: new FormControl("", Validators.required),
      fecha_facturacion: new FormControl(Date.now),
      fecha_creacion: new FormControl(Date.now)
    });
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
    });
  }

  onSubmit() {
    if(this.formGroup.valid){

      this._facturasService.SetFactura(this.formGroup.value).subscribe((result)=>{
        if (result.success) {
          this.openSnackBar(result.content);
          this.matDialogref.close();
        } else {
          this.openSnackBar(result.content);
        }
      });
        // this._usuariosService
        //   .SetCliente(this.formGroup.value)
        //   .pipe(
        //     tap((result: Response) => {
        //       this.openSnackBar(result.content);
        //       if (result.success) {
                
        //       }
        //     })
        //   )
        //   .subscribe(); 
    }else{
      this.openSnackBar("Introduzca los campos faltantes");
    }
  }

}
