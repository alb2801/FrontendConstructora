import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaiseService } from 'src/app/servicios/paise.service';

@Component({
  selector: 'app-proyecto-id',
  templateUrl: './proyecto-id.component.html',
  styleUrls: ['./proyecto-id.component.css']
})
export class ProyectoIdComponent implements OnInit {

  urlBackend: String = DatosGenerales.url;
  id: number = 0;
  proyec : ProyectoModelo[] = []
  info : any[]=[]
  info2 : any[]=[]
  constructor(
    private servicio: ProyectoService,
    private servicioCiudad: CiudadService,
    private servicioPais: PaiseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.proyec.push(datos) 
        console.log(this.proyec)
        this.ObtenerCiudad(datos.ciudad)
      },
      (err) => {
        alert("No se encuentra el registro con id: " + id);
      }
    );
  }


  ObtenerCiudad(id: any){
    this.servicioCiudad.BuscarRegistros(id).subscribe(
    (datos) => {
      this.info.push(datos.Nombre)
      this.ObtenerPais(datos.pais)
    },
    (err) => {
      alert("No se encuentra el registro con id: " + id);
    }
  );
  }

  ObtenerPais(id: any){
    this.servicioPais.BuscarRegistros(id).subscribe(
    (datos) => {
      this.info2.push(datos.Nombre)
    },
    (err) => {
      alert("No se encuentra el registro con id: " + id);
    }
  );
  }



}


  
