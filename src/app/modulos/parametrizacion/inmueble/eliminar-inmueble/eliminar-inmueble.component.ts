import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: InmuebleService,
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
        console.log(datos.Id_inmueble +"  "+ datos.Identificador)
        if (datos.Id_inmueble && datos.Identificador){
        this.listaDatos.push(datos.Id_inmueble?.toString());
        this.listaDatos.push(datos.Identificador);
        this.id = datos.Id_inmueble;
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
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }

}
