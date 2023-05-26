import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarritoComprasService } from '@app/shared/services/carrito-compras.service';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.css']
})
export class UserlayoutComponent {
  products$!: Observable<any[]>;
  products!: any;
  constructor(
    private router: Router,
    private carritoService: CarritoComprasService
  ){}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((products: any)=>{
      this.products = products.length;
    });
  }

  compras(){
    this.router.navigateByUrl("/user/seleccion/compras");
  }
}
