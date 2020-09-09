import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


constructor( private login:LoginService,
            private router:Router){}

  canActivate(): boolean  {

  if( this.login.Autenticado()){
      return true;
  }else{
      this.router.navigateByUrl('/login');
      return false;
  }



  }

}
