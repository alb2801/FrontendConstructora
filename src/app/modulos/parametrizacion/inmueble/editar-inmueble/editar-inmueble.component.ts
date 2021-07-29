import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaBloques: BloqueModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private BloqueServicio: BloqueService,
    private router: Router,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      bloque: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.CargarBloques();
    this.ObtenerRegistroPorId(id);
  }

  CargarBloques(){
    this.BloqueServicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaBloques = datos;
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
        this.ObtenerFgValidator.id.setValue(datos.Id_inmueble);
        this.ObtenerFgValidator.identificador.setValue(datos.Identificador);
        this.ObtenerFgValidator.valor.setValue(datos.Valor);
        this.ObtenerFgValidator.bloque.setValue(datos.bloqueId);
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
    let id = this.ObtenerFgValidator.id.value;
    let idt = this.ObtenerFgValidator.identificador.value;
    let val = this.ObtenerFgValidator.valor.value;
    let blo = this.ObtenerFgValidator.bloque.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.Id_inmueble = id;
    modelo.Identificador = idt;
    modelo.Valor = parseInt(val);
    modelo.bloqueId = parseInt(blo);
    console.log(modelo.Valor)
    this.servicio.ModificarRegistro(modelo).subscribe(
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

