import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { TodasCategoriasComponent } from './components/todas-categorias/todas-categorias.component';
import { AdminGuard } from '@app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'crear-categoria',
    canActivate:[AdminGuard],
    component: CrearCategoriaComponent
  },
  {
    path: 'todas-categorias',
    canActivate:[AdminGuard],
    component: TodasCategoriasComponent
  },
  {
    path: 'editar-categoria/:id',
    canActivate:[AdminGuard],
    component: EditarCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
