import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './components/entrada/entrada.component';
import { MostrarProductoComponent } from './components/mostrar-producto/mostrar-producto.component';
import { ComprasComponent } from './components/compras/compras.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos',
    component: EntradaComponent
  },
  {
    path: 'mostrar-producto/:id',
    component: MostrarProductoComponent
  },
  {
    path: 'compras',
    component: ComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionRoutingModule { }
