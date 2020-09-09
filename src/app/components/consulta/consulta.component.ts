import { Router, ActivatedRoute } from "@angular/router";
import { ProductoModel } from "src/app/models/producto.modelo";
import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto/producto.service";
import Swal from "sweetalert2";
import { Subject } from 'rxjs';

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent implements OnInit {
  producto = new ProductoModel();
  productos: ProductoModel[] = [];
  cargando = false;
  pageActual: 1;
  buscar: string;
  dtOptions: DataTables.Settings = {};


  constructor(private productoservice: ProductoService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.productoservice.obtenerProductos().subscribe((resp) => {
      this.productos = resp;
      this.cargando = false;
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
  }


  eliminarProducto(producto: ProductoModel, i: number) {
    Swal.fire({
      title: "¿Está seguro?",
      text: "No podras revertir esto..",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "Eliminado!",
          `El producto ${producto.nombre} fue eliminado exitosamente`
        );
        this.productos.splice(i, 1);
        this.productoservice.eliminarProducto(producto.id).subscribe();
      }
    });
  }


}
