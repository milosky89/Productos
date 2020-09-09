import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor(private logeo:LoginService,
              private router:Router) { }

  ngOnInit() {
    this.usuario = new Usuario();


  }

  onSubmit(form:NgForm){

    if(form.invalid){
      return;
    }
    this.logeo.nuevoUsuario(this.usuario)
              .subscribe(resp =>{
                  console.log(resp);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro exitoso',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.router.navigateByUrl('/home');

              },(err)=>{
                  console.log(err.error.error.message);
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al autenticar',
                    text: err.error.error.message,
                    showConfirmButton: false,
                    timer: 1500
                  })
              } );


  }


}
