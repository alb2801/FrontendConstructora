import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaiseService } from 'src/app/servicios/paise.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: PaiseService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]]
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
    let modelo: PaisModelo = new PaisModelo();
    modelo.Nombre = nom;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-paises"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}
