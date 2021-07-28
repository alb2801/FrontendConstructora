import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];
  urlBackend: String = DatosGenerales.url;
  //nombreImagenTemp: String = "Sin imagen";

  constructor(private fb: FormBuilder,
    private Proyectoservicio: ProyectoService,
    private CiudadServicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', []],
      nombreImagen: ['', [Validators.required]],
      ciudad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.CargarCiudades();
    this.ObtenerRegistroPorId(id);
  }

  CargarCiudades(){
    this.CiudadServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaCiudades = datos;
        this.listaCiudades = datos;
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
    this.Proyectoservicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_proyecto);
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.descripcion.setValue(datos.Descripcion);
        this.ObtenerFgValidator.nombreImagen.setValue(datos.Imagen);
        this.ObtenerFgValidator.ciudad.setValue(datos.ciudad);
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
    let ciudad = this.ObtenerFgValidator.ciudad.value;
    let img = this.ObtenerFgValidator.nombreImagen.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.Id_proyecto= id;
    modelo.Nombre = nom;
    modelo.Descripcion = des;
    modelo.ciudad = parseInt(ciudad);
    modelo.Imagen = img;
    this.Proyectoservicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) => {
        alert("Error modificando el registro");
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
       // this.nombreImagenTemp = datos.filename;
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}

