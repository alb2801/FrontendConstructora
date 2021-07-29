import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent implements OnInit {

  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistroPorPagina;
  listarRegistros: InmuebleModelo[] = [];
  constructor(private servivio: InmuebleService) { }

  ngOnInit(): void {
    this.ObtenerListadoProyectos();
  }

  ObtenerListadoProyectos(){
    this.servivio.ListarRegistros().subscribe(
      (datos) => {
        this.listarRegistros = datos;
        console.log(datos)
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