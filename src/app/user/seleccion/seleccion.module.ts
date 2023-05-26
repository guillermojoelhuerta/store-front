import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeleccionRoutingModule } from './seleccion-routing.module';
import { EntradaComponent } from './components/entrada/entrada.component';
import { MostrarProductoComponent } from './components/mostrar-producto/mostrar-producto.component';
import { ComprasComponent } from './components/compras/compras.component';

import { StoreModule } from '@ngrx/store';
import { paginationReducer } from './ngrx/pagination.reducer';

@NgModule({
  declarations: [
    EntradaComponent,
    MostrarProductoComponent,
    ComprasComponent
  ],
  imports: [
    CommonModule,
    SeleccionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ pagination: paginationReducer })
  ]
})
export class SeleccionModule { }
