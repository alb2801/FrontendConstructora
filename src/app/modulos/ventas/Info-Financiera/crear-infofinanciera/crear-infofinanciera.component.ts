import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InfoFinacieraModelo } from 'src/app/modelos/info-finaciera.modelo';
import { ClienteService } from 'src/app/servicios/cliente-service.service';

import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-infofinanciera',
  templateUrl: './crear-infofinanciera.component.html',
  styleUrls: ['./crear-infofinanciera.component.css']
})
export class CrearInfofinancieraComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCliente: ClienteModelo[] = [];

  constructor(private fb: FormBuilder,
    private InfoFinancieraService: InfoFinancieraService,
    private Clienteservicio: ClienteService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      Total_ingresos: ['', [Validators.required]],
      Datos_trabajo: ['', [Validators.required]],
      Tiempo_trab_actual: ['', [Validators.required]],
      Nombre_ref_familiar: ['', [Validators.required]],
      Telefono_ref_familiar: ['', [Validators.required]],
      Nombre_ref_personal: ['', [Validators.required]],
      Telefono_ref_personal: ['', [Validators.required]],
      clienteId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.Clienteservicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaCliente = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando los clientes")
      }
    );
  }

  get ObtenerFgValidator(){
    return this.fgValidador.controls;
  }
  GuardarRegistro(){
    let tot = this.ObtenerFgValidator.Total_ingresos.value;
    let dat = this.ObtenerFgValidator.Datos_trabajo.value;
    let time = this.ObtenerFgValidator.Tiempo_trab_actual.value;
    let refF = this.ObtenerFgValidator.Nombre_ref_familiar.value;
    let telF = this.ObtenerFgValidator.Telefono_ref_familiar.value;
    let refP = this.ObtenerFgValidator.Nombre_ref_personal.value;
    let telP = this.ObtenerFgValidator.Telefono_ref_personal.value;
    let cliente = this.ObtenerFgValidator.clienteId.value;
    let modelo: InfoFinacieraModelo = new InfoFinacieraModelo();
    modelo.Total_ingresos = parseInt(tot);
    modelo.Datos_trabajo = dat;
    modelo.Tiempo_trab_actual = time;
    modelo.Nombre_ref_familiar = refF;
    modelo.Telefono_ref_familiar = parseInt(telF);
    modelo.Nombre_ref_personal = refP;
    modelo.Telefono_ref_personal = parseInt(telP);
    modelo.clienteId = parseInt(cliente);


    this.InfoFinancieraService.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

}