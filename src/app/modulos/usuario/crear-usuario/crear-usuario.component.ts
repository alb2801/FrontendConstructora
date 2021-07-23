import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router
  ) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
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
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){
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

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-usuario"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}
