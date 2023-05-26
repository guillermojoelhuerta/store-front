import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './admin/layouts/adminlayout/adminlayout.component';
import { UserlayoutComponent } from './user/layouts/userlayout/userlayout.component';
import { LayoutAccesoComponent } from './acceso/pages/layout-acceso/layout-acceso.component';
import { AccesoComponent } from './acceso/components/acceso/acceso.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user/seleccion/todos',
  },
  {
    path: 'user',
    component: UserlayoutComponent,
    children:[
      {
        path: 'seleccion',
        loadChildren: () => import('./user/seleccion/seleccion.module').then(m => m.SeleccionModule)
      }
    ]
  },
  {
    path: 'acceso',
    component: LayoutAccesoComponent,
    children:[
      {
        path: 'login',
        component: AccesoComponent
      }
    ]
  },
  {
    path: '',
    component: AdminlayoutComponent,
    children:[
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'ngrx',
    loadChildren: () => import('./prueba-ngrx/prueba-ngrx.module').then(m => m.PruebaNgrxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
