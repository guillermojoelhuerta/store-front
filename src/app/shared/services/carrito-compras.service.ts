import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '@app/core/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  private carritoSubject = new BehaviorSubject<Product[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() { }

  agregarProducto(producto: Product) {
    const productosActuales = this.carritoSubject.getValue();
    const nuevosProductos = [...productosActuales, producto];
    this.carritoSubject.next(nuevosProductos);
  }

  eliminarProducto(producto: Product){
    const productosActuales = this.carritoSubject.getValue();
    const indice = productosActuales.findIndex((current: Product) =>{
      return current.idProduct === producto.idProduct;
    });
    productosActuales.splice(indice, 1);
    this.carritoSubject.next(productosActuales);
  }
}
