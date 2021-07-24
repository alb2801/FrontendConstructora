import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];
  nombreImagenTemp?: String = "Sin imagen";

  constructor(private fb: FormBuilder,
    private Proyectoservicio: ProyectoService,
    private CiudadServicio: CiudadService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', []],
      nombremImagen: ['', [Validators.required]],
      ciudad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CiudadServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaCiudades = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando las ciudades")
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  GuardarRegistro(){
    let nom = this.ObtenerFgValidator.nombre.value;
    let des = this.ObtenerFgValidator.descripcion.value;
    let ciudad = this.ObtenerFgValidator.ciudad.value;
    let img = this.ObtenerFgValidator.nombremImagen.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.Nombre = nom;
    modelo.Descripcion = des;
    modelo.ciudad = parseInt(ciudad);
    modelo.Imagen = this.nombreImagenTemp;
    console.log( modelo.Descripcion)
    console.log( modelo.Imagen)

    this.Proyectoservicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

  CuandoSeleccionanArchivo(event:any){
    if(event.target.files.length > 0){
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    }else{
      console.log("Se ha cancelado la selecciónd e archivo");
    }
  }

  CargarImagenAlServidor(){
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.Proyectoservicio.CargarArchivo(formData).subscribe(
      (datos) =>{
        this.nombreImagenTemp = datos.filename;
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}