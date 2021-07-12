import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ListarPagosComponent } from './pago-clientes/listar-pagos/listar-pagos.component';
import { ListarProyectosComponent } from './proyectos/listar-proyectos/listar-proyectos.component';
import { InformeVentasComponent } from './info-ventas/informe-ventas/informe-ventas.component';


@NgModule({
  declarations: [
    ListarPagosComponent,
    ListarProyectosComponent,
    InformeVentasComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
