import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaBloques: BloqueModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private BloqueServicio: BloqueService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      bloque: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.BloqueServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaBloques = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando los bloques")
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  GuardarRegistro(){
    let idt = this.ObtenerFgValidator.identificador.value;
    let val = this.ObtenerFgValidator.valor.value;
    let blo = this.ObtenerFgValidator.bloque.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.Identificador = idt;
    modelo.Valor = parseInt(val);
    modelo.bloqueId = parseInt(blo);
    console.log(modelo.Valor)
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}

