import { Component } from '@angular/core';
import { CarritoComprasService } from '@app/shared/services/carrito-compras.service';
import { environment } from '../../../../../environments/environment';
import { Product } from '@app/core/models/Product.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  products!:any;
  total: number = 0;
  img = `${environment.url_api}/uploads`;

  constructor(private carritoService: CarritoComprasService) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos:any) => {
      this.total = 0;
      this.products = productos;
      for(let x = 0; x < this.products.length; x++){
        this.total = this.total + Number(this.products[x].price);
      }
    });
  }

  deleteProduct(product: Product){
    this.carritoService.eliminarProducto(product);
  }
}
