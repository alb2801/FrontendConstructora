import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { cambiarClaveModelo } from 'src/app/modelos/cambiar-contraseña.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      contraseñaActual: ['', [Validators.required]],
      contraseñaNueva: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  CambiarClave() {
    if (this.fgValidador.invalid) {
      alert("Formulario inválido")
    } else {
      let usuario = this.ObtenerFgvalidador.usuario.value;

      let modelo = new cambiarClaveModelo();
      modelo.Id_usuario = this.servicioSeguridad.UsuarioId();
      modelo.Contraseña = crypto.MD5(this.ObtenerFgvalidador.contraseñaActual?.value).toString();
      modelo.ContraseñaNueva = this.ObtenerFgvalidador.contraseñaNueva?.value;
      this.servicioSeguridad.CambiarContraseña(modelo).subscribe(
        (datos) => {
          alert("Contraseña cambiada, verifique en su numero de telefono asociado a la cuenta la nueva contraseña")
          this.router.navigate(["/seguridad/iniciar-sesion"]);
        },
        (error) => {
          alert("Error cambiando contraseña");
          console.log(error);
        }
      );
    }
  }
}
