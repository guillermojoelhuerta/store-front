import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosProductosComponent } from './components/todos-productos/todos-productos.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './components/editar-productos/editar-productos.component';
import { AdminGuard } from '@app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'crear-producto',
    canActivate:[AdminGuard],
    component: CrearProductosComponent
  },
  {
    path: 'todos-producto',
    canActivate:[AdminGuard],
    component: TodosProductosComponent
  },
  {
    path: 'editar-producto/:id',
    canActivate:[AdminGuard],
    component: EditarProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
