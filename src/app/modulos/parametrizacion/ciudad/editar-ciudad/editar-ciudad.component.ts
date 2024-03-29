import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaiseService } from 'src/app/servicios/paise.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPaises: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private PaiseServicio: PaiseService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      pais: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.CargarPaises();
    this.ObtenerRegistroPorId(id);
  }

  CargarPaises(){
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

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_ciudad);
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
        this.ObtenerFgValidator.pais.setValue(datos.pais);
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
    let ps = this.ObtenerFgValidator.pais.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.Id_ciudad = id;
    modelo.Nombre = nom;
    modelo.pais= parseInt(ps);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }

}

