import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaiseService } from 'src/app/servicios/paise.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: PaiseService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_pais);
        this.ObtenerFgValidator.nombre.setValue(datos.Nombre);
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
    let modelo: PaisModelo = new PaisModelo();
    modelo.Id_pais = id;
    modelo.Nombre = nom;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametrizacion/listar-paises"])
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }

}

