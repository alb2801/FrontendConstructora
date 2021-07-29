import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { InfoFinacieraModelo } from 'src/app/modelos/info-finaciera.modelo';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';

@Component({
  selector: 'app-listar-infofinanciera',
  templateUrl: './listar-infofinanciera.component.html',
  styleUrls: ['./listar-infofinanciera.component.css']
})
export class ListarInfofinancieraComponent implements OnInit {
  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistroPorPagina;
  listarRegistros: InfoFinacieraModelo[] = [];
  constructor(private servivio: InfoFinancieraService) { }

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