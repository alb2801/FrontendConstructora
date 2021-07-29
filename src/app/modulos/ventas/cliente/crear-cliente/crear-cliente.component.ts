import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente-service.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];
  nombreImagenTemp?: String = "Sin imagen";

  constructor(private fb: FormBuilder,
    private Clienteservicio: ClienteService,
    private CiudadServicio: CiudadService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fechaN: ['', [Validators.required]],
      imagen: ['', []],
      nombreImagen: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
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
    let doc = this.ObtenerFgValidator.documento.value;
    let nom = this.ObtenerFgValidator.nombre.value;
    let apl = this.ObtenerFgValidator.apellido.value;
    let fen = this.ObtenerFgValidator.fechaN.value;
    let cel = this.ObtenerFgValidator.celular.value;
    let corr = this.ObtenerFgValidator.correo.value;
    let drc = this.ObtenerFgValidator.direccion.value;
    let ciudad = this.ObtenerFgValidator.ciudad.value;
    let img = this.ObtenerFgValidator.nombreImagen.value;
    let modelo: ClienteModelo = new ClienteModelo();
    modelo.Documento = doc;
    modelo.Nombre = nom;
    modelo.Apellido = apl;
    modelo.Fecha_nacimiento = fen;
    modelo.Celular = cel;
    modelo.Correo_electronico = corr;
    modelo.Direccion = drc;
    modelo.ciudadId = parseInt(ciudad);
    modelo.Fotografia = img;
    console.log(modelo.Fotografia)

    this.Clienteservicio.AlmacenarRegistro(modelo).subscribe(
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
    this.Clienteservicio.CargarArchivo(formData).subscribe(
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