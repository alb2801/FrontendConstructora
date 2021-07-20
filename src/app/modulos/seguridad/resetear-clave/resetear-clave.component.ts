import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPassModelo } from 'src/app/modelos/resetear-contraseña.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-resetear-clave',
  templateUrl: './resetear-clave.component.html',
  styleUrls: ['./resetear-clave.component.css']
})
export class ResetearClaveComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      usuario: ['alberth.1701810797@ucaldas.edu.co', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ResetearClave() {
    if (this.fgValidador.invalid) {
      alert("Formulario inválido")
    } else {
      let usuario = this.ObtenerFgvalidador.usuario.value;

      let modelo = new ResetPassModelo();
      modelo.Correo = usuario;
      this.servicioSeguridad.ResetearContraseña(modelo).subscribe(
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