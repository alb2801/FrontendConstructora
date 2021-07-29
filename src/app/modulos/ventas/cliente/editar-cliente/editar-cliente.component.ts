import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente-service.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];
  urlBackend: String = DatosGenerales.url;

  constructor(private fb: FormBuilder,
    private Clienteservicio: ClienteService,
    private CiudadServicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
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
        alert("error cargando")
      }
    );
  }
  ObtenerRegistroPorId(id: number){
    this.Clienteservicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_cliente);
        this.ObtenerFgValidator.documento.setValue(datos.Documento);
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.apellido.setValue(datos.Apellido);
        this.ObtenerFgValidator.fechaN.setValue(datos.Fecha_nacimiento);
        this.ObtenerFgValidator.celular.setValue(datos.Celular);
        this.ObtenerFgValidator.correo.setValue(datos.Correo_electronico);
        this.ObtenerFgValidator.direccion.setValue(datos.Direccion);
        this.ObtenerFgValidator.nombreImagen.setValue(datos.Fotografia);
        this.ObtenerFgValidator.ciudad.setValue(datos.ciudadId);
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
    let id = this.ObtenerFgValidator.id.value
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
    modelo.Id_cliente= id;
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

    this.Clienteservicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/ventas/listar-cliente"])
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
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}