import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: ProyectoService,
    private router: Router,
    private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        console.log(datos.Id_proyecto +"  "+ datos.Nombre)
        if (datos.Id_proyecto && datos.Nombre){
        this.listaDatos.push(datos.Id_proyecto?.toString());
        this.listaDatos.push(datos.Nombre);
        this.id = datos.Id_proyecto;
      }
      },
      (err) => {
        alert("No se encuentra el registro con id: " + id);
      }
    );
  }


  EliminarRegistro(){
    let id = this.id;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro eliminado correctamente");
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }

}