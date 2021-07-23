import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaiseService } from 'src/app/servicios/paise.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPaises: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private PaiseServicio: PaiseService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      pais: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.PaiseServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaPaises = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando los deptos")
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  GuardarRegistro(){
    let nom = this.ObtenerFgValidator.nombre.value;
    let ps = this.ObtenerFgValidator.pais.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.Nombre = nom;
    modelo.pais = parseInt(ps);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}
