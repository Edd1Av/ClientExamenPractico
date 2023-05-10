import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { LocalStorage } from 'src/app/models/LocalStorage';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {Response} from 'src/app/models/Response';

@Component({
  selector: 'app-insert-cliente',
  templateUrl: './insert-cliente.component.html',
  styleUrls: ['./insert-cliente.component.css']
})

export class InsertClienteComponent implements OnInit {

  formGroup!: FormGroup;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private matDialogref: MatDialogRef<InsertClienteComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthorizeService,
    private _usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) { }
  User:LocalStorage;
  ngOnInit(): void {
    
  this.buildForm();
  if(this.authService.usuarioData!=null){
    this.User=this.authService.usuarioData;
  }
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      edad: new FormControl("", Validators.required),
      correo_Electronico: new FormControl("", Validators.required),
      //tipo_Usuario: new FormControl("", Validators.required)
    });
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
    });
  }

  onSubmit() {
    if(this.formGroup.valid){

      this._usuariosService.SetCliente(this.formGroup.value).subscribe((result)=>{
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
