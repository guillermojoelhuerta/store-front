import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { TodasCategoriasComponent } from './components/todas-categorias/todas-categorias.component';

      
@NgModule({
  declarations: [
    CrearCategoriaComponent,
    EditarCategoriaComponent,
    TodasCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class CategoriasModule { }
