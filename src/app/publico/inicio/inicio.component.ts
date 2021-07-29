import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { DatosGenerales } from 'src/app/config/datos.generales';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaProyectos: ProyectoModelo[] = [];
  isLoggedIn: boolean = false;
  urlBackend: String = DatosGenerales.url;

  constructor(private servicioSeguridad: SeguridadService,
    private Proyectoservicio: ProyectoService) { }

  suscripcion: Subscription = new Subscription();

  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.ObtenerDatosSesion().subscribe(
      (datos) => {
        this.isLoggedIn = datos.isLoggedIn;
      },
      (error) => {

      }
    );

    this.Proyectoservicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaProyectos = datos;
      },
      (erro) =>{
        alert("error cargando las ciudades")
      }
    );

  }

}
