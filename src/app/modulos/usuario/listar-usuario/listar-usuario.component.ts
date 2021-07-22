import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistroPorPagina;
  listarRegistros: UsuarioModelo[] = [];
  constructor(private servicio: UsuarioService) { }
  

  ngOnInit(): void {
    this.ObtenerListadoUsuarios();
  }

  ObtenerListadoUsuarios(){
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listarRegistros = datos;
        console.log(this.listarRegistros)
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
