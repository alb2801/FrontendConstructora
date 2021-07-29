import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InfoFinacieraModelo } from 'src/app/modelos/info-finaciera.modelo';
import { ClienteService } from 'src/app/servicios/cliente-service.service';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-infofinanciera',
  templateUrl: './editar-infofinanciera.component.html',
  styleUrls: ['./editar-infofinanciera.component.css']
})
export class EditarInfofinancieraComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaCliente: ClienteModelo[] = [];
  urlBackend: String = DatosGenerales.url;


  constructor(private fb: FormBuilder,
    private InfoFinancieraService: InfoFinancieraService,
    private Clienteservicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
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
    let id = this.route.snapshot.params["id"];
    this.CargarClientes();
    this.ObtenerRegistroPorId(id);
  }

  CargarClientes(){
    this.Clienteservicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaCliente = datos;
        this.listaCliente = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (erro) =>{
        alert("error cargando")
      }
    );
  }
  ObtenerRegistroPorId(id: number){
    this.InfoFinancieraService.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidator.id.setValue(datos.Id_financiera);
        this.ObtenerFgValidator.Total_ingresos.setValue(datos.Total_ingresos);
        this.ObtenerFgValidator.Datos_trabajo.setValue(datos.Datos_trabajo);
        this.ObtenerFgValidator.Tiempo_trab_actual.setValue(datos.Tiempo_trab_actual);
        this.ObtenerFgValidator.Nombre_ref_familiar.setValue(datos.Nombre_ref_familiar);
        this.ObtenerFgValidator.Telefono_ref_familiar.setValue(datos.Telefono_ref_familiar);
        this.ObtenerFgValidator.Nombre_ref_personal.setValue(datos.Nombre_ref_personal);
        this.ObtenerFgValidator.Telefono_ref_personal.setValue(datos.Telefono_ref_personal);
        this.ObtenerFgValidator.clienteId.setValue(datos.clienteId);
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
    let tot = this.ObtenerFgValidator.Total_ingresos.value;
    let dat = this.ObtenerFgValidator.Datos_trabajo.value;
    let tim = this.ObtenerFgValidator.Tiempo_trab_actual.value;
    let nomF = this.ObtenerFgValidator.Nombre_ref_familiar.value;
    let telF = this.ObtenerFgValidator.Telefono_ref_familiar.value;
    let nomP = this.ObtenerFgValidator.Nombre_ref_personal.value;
    let telP = this.ObtenerFgValidator.Telefono_ref_personal.value;
    let cliente = this.ObtenerFgValidator.clienteId.value;
    let modelo: InfoFinacieraModelo = new InfoFinacieraModelo();
    modelo.Id_financiera= id;
    modelo.Total_ingresos = parseInt(tot);
    modelo.Datos_trabajo = dat;
    modelo.Tiempo_trab_actual = tim;
    modelo.Nombre_ref_familiar = nomF;
    modelo.Telefono_ref_familiar = parseInt(telF);
    modelo.Nombre_ref_personal = nomP;
    modelo.Telefono_ref_personal = parseInt(telP);
    modelo.clienteId = parseInt(cliente);


    this.InfoFinancieraService.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/ventas/listar-infoFinan"])
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }


}