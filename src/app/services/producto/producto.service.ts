import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from 'src/app/models/producto.modelo';
import { map,delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url='https://producto-app-dc2f9.firebaseio.com';

  constructor(private http:HttpClient) { }


  crearProducto(producto:ProductoModel){

    return this.http.post(`${this.url}/productos.json`,producto)
               .pipe(
                 map( (resp: any) => {
                     producto.id = resp.name;
                     return producto;
                 })
               );
  }

  actualizarProducto(producto:ProductoModel){

    const productoTemp={
      ...producto
    };
    delete productoTemp.id;

    return this.http.put(`${this.url}/productos/${producto.id}.json`,productoTemp);
  }


  obtenerProductosId(id :string){
    return this.http.get(`${this.url}/productos/${id}.json`);
  }



  obtenerProductosNombre(nombre:string){
    return this.http.get(`${this.url}/productos/${nombre}.json`)
    .pipe(
      map(this.crearArreglo ),
      delay(1200)
    );
  }


  obtenerProductos(){
      return this.http.get(`${this.url}/productos.json`)
                  .pipe(
                    map( resp=> this.crearArreglo(resp) ),
                    delay(1200)
                  );
  }




  private crearArreglo( productosObj: object){

    const productos: ProductoModel[]= [];


    if(productosObj === null){ return[];}

    Object.keys(productosObj).forEach(key =>{

      const producto: ProductoModel = productosObj[key];
      producto.id = key;

      productos.push(producto);
    });


    return productos
  }


  eliminarProducto(id: string){

    return this.http.delete(`${this.url}/productos/${id}.json`);

  }



}
