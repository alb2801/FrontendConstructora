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
      ContrasenaActual: ['', [Validators.required, Validators.min(3)]],
      ContrasenaNueva: ['', [Validators.required, Validators.min(3)]]
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
      let Contrasena = this.ObtenerFgvalidador.ContrasenaActual?.value;
      let ContrasenaNueva = this.ObtenerFgvalidador.ContrasenaNueva?.value;

      let modelo = new cambiarClaveModelo();
      modelo.Id_usuario = this.servicioSeguridad.UsuarioId();
      modelo.Contraseña = crypto.MD5(Contrasena).toString();
      modelo.ContraseñaNueva = ContrasenaNueva;
      this.servicioSeguridad.CambiarContraseña(modelo).subscribe(
        (datos) => {
          alert("Contraseña cambiada")
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
