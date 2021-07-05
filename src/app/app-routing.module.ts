import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path:'cliente',
    loadChildren: ()=> import('./modulos/cliente/cliente.module').then(m=>m.ClienteModule)
  },
  {
    path:'parametrizacion',
    loadChildren: ()=> import('./modulos/parametrizacion/parametrizacion.module').then(m=>m.ParametrizacionModule)
  },
  {
    path:'reportes',
    loadChildren: ()=> import('./modulos/reportes/reportes.module').then(m=>m.ReportesModule)
  },
  {
    path:'seguridad',
    loadChildren: ()=> import('./modulos/seguridad/seguridad.module').then(m=>m.SeguridadModule)
  },
  {
    path:'usuario',
    loadChildren: ()=> import('./modulos/usuario/usuario.module').then(m=>m.UsuarioModule)
  },
  {
    path:'vendedor',
    loadChildren: ()=> import('./modulos/vendedor/vendedor.module').then(m=>m.VendedorModule)
  },
  {
    path: '**',
    component:Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
