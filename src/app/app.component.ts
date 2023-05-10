import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthorizeService } from './services/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  constructor(private authService: AuthorizeService) { }

  usuarioLoggeado:Boolean;
  load:Boolean;

  ngOnInit(){

    this.usuarioLoggeado = this.authService.isLogged();
    this.authService.changeLoginStatus.subscribe((value)=>{
      if(value){
        this.usuarioLoggeado=true;
      }
      else{
        this.usuarioLoggeado = false;
      }
      
    });
  }

}
