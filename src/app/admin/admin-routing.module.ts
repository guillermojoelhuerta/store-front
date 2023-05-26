import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
      
const routes: Routes = [  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productos',      
  },
  {     
    path: 'productos',      
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
  }        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
