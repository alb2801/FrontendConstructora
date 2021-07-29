import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaProyectos: ProyectoModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private ProyectoServicio: ProyectoService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyecto: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.CargarProyectos();
    this.ObtenerRegistroPorId(id);
  }

  CargarProyectos(){
    this.ProyectoServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaProyectos = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando los deptos")
      }
    );
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_bloque);
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.descripcion.setValue(datos.Descripcion);
        this.ObtenerFgValidator.proyecto.setValue(datos.proyectoId);
      },
      (err) => {
        alert("No se encuentra el registro con id: " + id);
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  ModificarRegistro(){
    let nom = this.ObtenerFgValidator.nombre.value;
    let id = this.ObtenerFgValidator.id.value;
    let des = this.ObtenerFgValidator.descripcion.value;
    let pro = this.ObtenerFgValidator.proyecto.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.Id_bloque = id;
    modelo.Nombre = nom;
    modelo.Descripcion = des;
    modelo.proyectoId = parseInt(pro);
    console.log(modelo.proyectoId)
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-bloques"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}

