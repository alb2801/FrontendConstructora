import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  
  fgValidador: FormGroup = new FormGroup({});
  listaCiudades: CiudadModelo[] = [];

  constructor(
    private fb: FormBuilder,
    private servicio: UsuarioService,
    private CiudadServicio: CiudadService,
    private router: Router
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
    let ape = this.ObtenerFgValidator.ape.value;
    let correo = this.ObtenerFgValidator.correo.value;
    let celular = parseInt(this.ObtenerFgValidator.celular.value);
    let doc = parseInt(this.ObtenerFgValidator.doc.value);
    let ciudad = this.ObtenerFgValidator.ciudad.value;
    let rol = this.ObtenerFgValidator.rol.value;
    
    console.log(nom+ape+correo+celular+doc+rol+ciudad)
    let modelo: UsuarioModelo = new UsuarioModelo();

    modelo.Nombre = nom;
    modelo.Apellido = ape;
    modelo.Correo = correo;
    modelo.Celular = celular;
    modelo.Ciudad = ciudad;
    modelo.Rol = rol;
    modelo.Documento = doc;
    console.log(modelo)
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/usuario/listar-usuario"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}
