import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaiseService } from 'src/app/servicios/paise.service';
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
  listaPaises: PaisModelo[] = [];
  urlBackend: String = DatosGenerales.url;

  constructor(private fb: FormBuilder,
    private Proyectoservicio: ProyectoService,
    private CiudadServicio: CiudadService,
    private PaServicio: PaiseService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      pais: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', []],
      nombreImagen: ['', [Validators.required]],
      ciudad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.cargarPaises();
  }

  cargarPaises(){
    
    this.PaServicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaPaises = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      }
    );
  }

  cargarCiudadesPorPais(){
    this.CiudadServicio.BuscarRegistrosPorPais(this.fgValidador.controls.pais.value).subscribe(
      (datos) => {
        this.listaCiudades = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
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
    let img = this.ObtenerFgValidator.nombreImagen.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.Nombre = nom;
    modelo.Descripcion = des;
    modelo.ciudad = parseInt(ciudad);
    modelo.Imagen = img;
    console.log(modelo.Imagen)

    this.Proyectoservicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-proyectos"])
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
      console.log("Se ha cancelado la selección de archivo");
    }
  }

  CargarImagenAlServidor(){
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.Proyectoservicio.CargarArchivo(formData).subscribe(
      (datos) =>{
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}