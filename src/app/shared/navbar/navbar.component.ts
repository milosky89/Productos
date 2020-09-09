import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(private login:LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  salir(){
      this.login.logout();
      this.router.navigateByUrl('/login');
  }

}
