import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from '../models/LoginUsuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizeService } from '../services/authorize.service';
import { ETipoUsuario } from '../enums/tipo_usuario.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private authorizeService: AuthorizeService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,) { }

   
    datos:LoginUsuario;
    formGroup!: FormGroup;
  async ngOnInit() {
    this.buildForm();

    
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  onSubmit(){
    if(this.formGroup.valid){
      this.authorizeService.Login(this.formGroup.value).subscribe(result=> {
        console.log(result);
        if (result.success == true){
          if(result.rolId==ETipoUsuario.ADMINISTRADOR || result.rolId==ETipoUsuario.GERENTE){
            console.log("es admin ir a home");
            this.router.navigate(["/home"]);
          }
        }
        else{
          this.openSnackBar("Datos incorrectos");
        }
      });
    }
    else{
      this.openSnackBar("Rellene todos los campos");
    }
    
  }

  // openDialog(): void {
  //   let dialog = this.dialog.open(ResetPasswordComponent, {
  //     width: "400px",
  //     disableClose: true,
  //   });
  //   dialog.afterClosed().subscribe((result) => {
      
  //   });
  // }

  openSnackBar(message:string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
    });
  }
}
