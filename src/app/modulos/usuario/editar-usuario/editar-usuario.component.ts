import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      Documento: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Correo: ['', [Validators.required]],
      Celular:['', [Validators.required]],
      Ciudad:['', [Validators.required]],
      Contrasena:['', [Validators.required]],
      Rol:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_usuario);
        this.ObtenerFgValidator.Nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.Apellido.setValue(datos.Apellido);
        this.ObtenerFgValidator.Correo.setValue(datos.Correo);
        this.ObtenerFgValidator.Celular.setValue(datos.Celular);
        this.ObtenerFgValidator.Ciudad.setValue(datos.Ciudad);
        this.ObtenerFgValidator.Contrasena.setValue(datos.Contrasena);
        this.ObtenerFgValidator.Rol.setValue(datos.Rol);
        this.ObtenerFgValidator.Documento.setValue(datos.Documento);
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
    let ape = this.ObtenerFgValidator.ape.value;
    let correo = this.ObtenerFgValidator.correo.value;
    let celular = this.ObtenerFgValidator.celular.value;
    let doc = this.ObtenerFgValidator.doc.value;
    let contras = this.ObtenerFgValidator.contras.value;
    let rol = this.ObtenerFgValidator.rol.value;
    let ciudad = this.ObtenerFgValidator.ciudad.value;

    let modelo: UsuarioModelo = new UsuarioModelo();

    modelo.Id_usuario = id;
    modelo.Nombre = nom;
    modelo.Apellido = ape;
    modelo.Correo = correo;
    modelo.Celular = celular;
    modelo.Ciudad = ciudad;
    modelo.Contrasena = contras;
    modelo.Rol = rol;
    modelo.Documento = doc;
    
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/usuarios/listar-usuarios"])
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }







}
