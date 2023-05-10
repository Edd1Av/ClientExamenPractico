import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdministradorGuard } from './guards/administrador.guard';

const routes: Routes = [
  { path: 'Usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)}, 
  { path: 'Facturas', loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule), canActivate:[AdministradorGuard]},
  { path: '', component: HomeComponent, canActivate:[AdministradorGuard]},
  { path: 'home', component: HomeComponent, canActivate:[AdministradorGuard]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
