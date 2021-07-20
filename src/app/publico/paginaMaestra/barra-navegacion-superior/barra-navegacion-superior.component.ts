import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
//import * as jwt from 'jsonwebtoken';


@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css']
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private servicioSeguridad: SeguridadService) { }

  suscripcion: Subscription = new Subscription();


  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.ObtenerDatosSesion().subscribe(
      (datos) => {
        this.isLoggedIn = datos.isLoggedIn;
        //this.isAdmin= datos
        
        
        console.log(datos)
        console.log(datos.Rol)
        console.log(datos.Nombre)
        console.log(datos.Apellido)
        console.log(datos.tk)
      },
      (error) => {

      }
    );
  }

}
