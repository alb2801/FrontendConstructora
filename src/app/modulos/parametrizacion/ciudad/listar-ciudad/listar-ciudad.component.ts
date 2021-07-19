import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';



@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {
  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistroPorPagina;
  listarRegistros: CiudadModelo[] = [];
  constructor(private servivio: CiudadService) { }

  ngOnInit(): void {
    this.ObtenerListadoCiudades();
  }

  ObtenerListadoCiudades(){
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