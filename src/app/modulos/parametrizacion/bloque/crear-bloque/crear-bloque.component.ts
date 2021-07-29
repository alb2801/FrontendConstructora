import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaProyectos: ProyectoModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private ProyectoServicio: ProyectoService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyecto: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ProyectoServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaProyectos = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando los proyectos")
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  GuardarRegistro(){
    let nom = this.ObtenerFgValidator.nombre.value;
    let des = this.ObtenerFgValidator.descripcion.value;
    let pro = this.ObtenerFgValidator.proyecto.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.Nombre = nom;
    modelo.Descripcion = des;
    modelo.proyectoId = parseInt(pro);
    console.log(modelo.proyectoId)
    this.servicio.AlmacenarRegistro(modelo).subscribe(
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
