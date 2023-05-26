import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '@app/shared/services/product.service';
import { CarritoComprasService } from '@app/shared/services/carrito-compras.service';
import { Product } from '@app/core/models/Product.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.css']
})
export class MostrarProductoComponent {
  id:number = 0;
  product!: Product;
  img = `${environment.url_api}/uploads`;
  carrito$ = new BehaviorSubject<number>(0);

  constructor(
    private carritoService: CarritoComprasService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params : Params) =>{
      this.id = params["id"];
    });

    this.productService.getByIdPublic(this.id).subscribe((response:any) =>{
      this.product = response;
    },((error: any) => {
      console.log("error = ", error);
    }));
  }

  comprar(){
    this.carritoService.agregarProducto(this.product);
  }
}
