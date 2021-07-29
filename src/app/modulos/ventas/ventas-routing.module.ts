import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearInfofinancieraComponent } from './Info-Financiera/crear-infofinanciera/crear-infofinanciera.component';
import { EditarInfofinancieraComponent } from './Info-Financiera/editar-infofinanciera/editar-infofinanciera.component';
import { ListarInfofinancieraComponent } from './Info-Financiera/listar-infofinanciera/listar-infofinanciera.component';

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
  },
  {
    path: 'listar-infoFinan',
    component: ListarInfofinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-infoFinan',
    component: CrearInfofinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-infoFinan',
    component: EditarInfofinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
