import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];
  urlBackend: String = DatosGenerales.url;

  constructor(
    private fb: FormBuilder,
    private servicio: UsuarioService,
    private CiudadServicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      ape: ['', [Validators.required]],
      doc: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required,Validators.email]],
      ciudad:['', [Validators.required]],
      rol:['', [Validators.required]]
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
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.ape.setValue(datos.Apellido);
        this.ObtenerFgValidator.correo.setValue(datos.Correo);
        this.ObtenerFgValidator.celular.setValue(datos.Celular);
        this.ObtenerFgValidator.ciudad.setValue(datos.Ciudad);
        this.ObtenerFgValidator.rol.setValue(datos.Rol);
        this.ObtenerFgValidator.doc.setValue(datos.Documento);

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
    let ape = this.ObtenerFgValidator.ape.value;
    let correo = this.ObtenerFgValidator.correo.value;
    let celular = parseInt(this.ObtenerFgValidator.celular.value);
    let doc = parseInt(this.ObtenerFgValidator.doc.value);
    let rol = this.ObtenerFgValidator.rol.value;
    let ciudad = this.ObtenerFgValidator.ciudad.value;

    let modelo: UsuarioModelo = new UsuarioModelo();

    modelo.Nombre = nom;
    modelo.Apellido = ape;
    modelo.Correo = correo;
    modelo.Celular = celular;
    modelo.Ciudad = ciudad;
    modelo.Rol = rol;
    modelo.Documento = doc;
    modelo.Id_usuario = this.route.snapshot.params["id"]
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/usuario/listar-usuario"])
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }







}
