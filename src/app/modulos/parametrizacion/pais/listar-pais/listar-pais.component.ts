import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { PaiseService } from 'src/app/servicios/paise.service';
import {PaisModelo} from '../../../../modelos/pais.modelo';

@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css']
})
export class ListarPaisComponent implements OnInit {
  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistroPorPagina;
  listarRegistros: PaisModelo[] = [];
  constructor(private servicio: PaiseService) { }

  ngOnInit(): void {
    this.ObtenerListadoPaises();
  }

  ObtenerListadoPaises(){
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listarRegistros = datos;
      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    )
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
