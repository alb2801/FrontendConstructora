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
  isVende: boolean = false;
  nombreCompleto: String ='';

  constructor(private servicioSeguridad: SeguridadService) { }

  suscripcion: Subscription = new Subscription();


  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.ObtenerDatosSesion().subscribe(
      (datos) => {
        this.isLoggedIn = datos.isLoggedIn;
        if(datos.Rol=='administrador'){
          this.isAdmin=true;
        }else{
          this.isAdmin=false;
        }
        if(datos.Rol=='vendedor'){
          this.isVende=true;
        }else{
          this.isVende=false
        }
        this.nombreCompleto = datos.Nombre +" "+datos.Apellido;
      },
      (error) => {

      }
    );
  }

}
