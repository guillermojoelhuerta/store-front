import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { TodosProductosComponent } from './components/todos-productos/todos-productos.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './components/editar-productos/editar-productos.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    TodosProductosComponent,
    CrearProductosComponent,
    EditarProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductosModule { }
