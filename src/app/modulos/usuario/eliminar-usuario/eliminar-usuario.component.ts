import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  listaDatos: String[] = [];
  id: String = '';

  constructor(
    private servicio: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        if (datos.Id_usuario && datos.Nombre){
        this.listaDatos.push(datos.Id_usuario?.toString());
        this.listaDatos.push(datos.Nombre);
        this.id = datos.Id_usuario;
      }
      },
      (err) => {
        alert("No se encuentra el registro con id: " + id);
      }
    );
  }

  EliminarRegistro(){
    let id = this.id;
    console.log(id)
    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro eliminado correctamente");
        this.router.navigate(["/usuario/listar-usuario"])
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }

}
