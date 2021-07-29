import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { ListarCiudadComponent } from '../parametrizacion/ciudad/listar-ciudad/listar-ciudad.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';

const routes: Routes = [
  {
    path: 'listar-cliente',
    component: ListarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-cliente',
    component: EditarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
