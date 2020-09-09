import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { PaisesService } from '../../services/pasis/paises.service';
import { ProductoModel } from '../../models/producto.modelo';
import { PaisesModel } from '../../models/paises.modelo';
import { ProductoService } from '../../services/producto/producto.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @ViewChild('imageProducto') inputImageProducto: ElementRef;
  formulario: FormGroup;
  producto = new ProductoModel();
  paiseslistado = new PaisesModel();
  paises: any[] = [];

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private fb: FormBuilder,
              private paiseservice:PaisesService,
              private productoservices:ProductoService,
              private router: Router,
              private route:ActivatedRoute,
              private storage:AngularFireStorage) {

    this.crearFormulario();

   }

  ngOnInit(): void {
    this.listarPaises();
   this.NuevoEditar();

  }

  listarPaises(){
    this.paiseservice.getPaises()
            .subscribe((paises: any) => {
                this.paises = paises;
            });
  }

  NuevoEditar(){
    const id= this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
        this.productoservices.obtenerProductosId(id)
        .subscribe((resp:ProductoModel) =>{
              this.producto= resp;
              this.producto.id = id;
        });
    }
  }



//Creacion de formulario
  crearFormulario(){

       this.formulario = this.fb.group({
         id: ['',],
         nompreProducto: ['', Validators.required],
         caracteristica: ['', Validators.required],
         fechaLanzamiento: ['',Validators.required],
         correofabricante: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
         paisFabricacion: ['',Validators.required],
         precio: ['',Validators.required],
         disponibles: ['',Validators.required],
         vendidas: ['',Validators.required],
         imagen: ['']
       });

     }

     public Guardar(){
      if(this.formulario.invalid){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Complete la información del registro',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      if(this.producto.id){

        this.productoservices.actualizarProducto(this.producto)
        .subscribe( resp =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.producto.nombre,
            text: 'Producto Actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/productos');
        });

      }else{

        this.productoservices.crearProducto(this.producto)
        .subscribe( resp =>{
          this.producto = resp;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto creado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/productos');
        });
      }

     }

     onUpload(e) {

      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = `uploads/producto_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    }


     //validaciones

     get nombreNovalido(){
      return this.formulario.get('nompreProducto').invalid && this.formulario.get('nompreProducto').touched
    }

    get caracteristicaNovalido(){
      return this.formulario.get('caracteristica').invalid && this.formulario.get('caracteristica').touched
    }

    get fechaNovalido(){
      return this.formulario.get('fechaLanzamiento').invalid && this.formulario.get('fechaLanzamiento').touched
    }

    get correoNovalido(){
      return this.formulario.get('correofabricante').invalid && this.formulario.get('correofabricante').touched
    }

    get paisesNovalido(){
      return this.formulario.get('paisFabricacion').invalid && this.formulario.get('paisFabricacion').touched
    }

    get precioNovalido(){
      return this.formulario.get('precio').invalid && this.formulario.get('precio').touched
    }

    get disponiblesNovalido(){
      return this.formulario.get('disponibles').invalid && this.formulario.get('disponibles').touched
    }
    get vendidasNovalido(){
      return this.formulario.get('vendidas').invalid && this.formulario.get('vendidas').touched
    }
}
