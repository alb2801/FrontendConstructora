import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { CrearPagoComponent } from './pago/crear-pago/crear-pago.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { AceptarCancelarSolicitudComponent } from './solicitud/aceptar-cancelar-solicitud/aceptar-cancelar-solicitud.component';
import { CrearInfofinancieraComponent } from './Info-Financiera/crear-infofinanciera/crear-infofinanciera.component';
import { EditarInfofinancieraComponent } from './Info-Financiera/editar-infofinanciera/editar-infofinanciera.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarInfofinancieraComponent } from './Info-Financiera/listar-infofinanciera/listar-infofinanciera.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    CrearPagoComponent,
    CrearSolicitudComponent,
    ListarSolicitudComponent,
    AceptarCancelarSolicitudComponent,
    CrearInfofinancieraComponent,
    EditarInfofinancieraComponent,
    ListarClienteComponent,
    ListarInfofinancieraComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
