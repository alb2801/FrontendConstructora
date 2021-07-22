import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

const routes: Routes = [
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'eliminar-usuario/:id',
    component: EliminarUsuarioComponent
  },
  {
    path: 'listar-usuario',
    component: ListarUsuarioComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
