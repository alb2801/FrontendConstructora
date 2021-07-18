import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path: 'listar-paises',
    component: ListarPaisComponent
  },
  {
    path: 'crear-paises',
    component: CrearPaisComponent
  },
  {
    path: 'editar-paises/:id',
    component: EditarPaisComponent
  },
  {
    path: 'eliminar-paises/:id',
    component: EliminarPaisComponent
  },
  {
    path: 'listar-ciudades',
    component: ListarCiudadComponent
  },
  {
    path: 'crear-ciudades',
    component: CrearCiudadComponent
  },
  {
    path: 'editar-ciudades/:id',
    component: EditarCiudadComponent
  },
  {
    path: 'eliminar-ciudades/:id',
    component: EliminarCiudadComponent
  },
  {
    path: 'listar-proyectos',
    component: ListarProyectoComponent
  },
  {
    path: 'listar-bloques',
    component: ListarBloqueComponent
  },
  {
    path: 'listar-inmuebles',
    component: ListarInmuebleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
