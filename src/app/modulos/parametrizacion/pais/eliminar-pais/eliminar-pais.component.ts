import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaiseService } from 'src/app/servicios/paise.service';

@Component({
  selector: 'app-eliminar-pais',
  templateUrl: './eliminar-pais.component.html',
  styleUrls: ['./eliminar-pais.component.css']
})
export class EliminarPaisComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: PaiseService,
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
        if (datos.Id_pais && datos.Nombre){
        this.listaDatos.push(datos.Id_pais?.toString());
        this.listaDatos.push(datos.Nombre);
        this.id = datos.Id_pais;
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
        this.router.navigate(["/parametrizacion/listar-paises"])
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }

}
