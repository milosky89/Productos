import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private iniciarsesion:LoginService,
              private router:Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit(form:NgForm){

    if(form.invalid){
      return;
    }



    this.iniciarsesion.ingresoUsuario(this.usuario)
              .subscribe(resp =>{
                  console.log(resp);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.router.navigateByUrl('/home');

              },(err)=>{
                  console.log(err.error.error.message);
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Correo y/o contraseña invalida',
                    showConfirmButton: false,
                    timer: 1500
                  })

              } );

  }

}
