import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InfoFinacieraModelo } from '../modelos/info-finaciera.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InfoFinancieraService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<InfoFinacieraModelo[]>{
    return this.http.get<InfoFinacieraModelo[]>(
      `${this.url}/info-financieras/?filter={"include":["cliente"]}`,
    {
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    });
  }

  BuscarRegistros(Id_financiera: number): Observable<InfoFinacieraModelo>{
    return this.http.get<InfoFinacieraModelo>(
      `${this.url}/info-financieras/${Id_financiera}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
      
  }

  AlmacenarRegistro(modelo: InfoFinacieraModelo): Observable<InfoFinacieraModelo> {
    return this.http.post<InfoFinacieraModelo>(
      `${this.url}/info-financieras`,
      {
        Total_ingresos: modelo.Total_ingresos,
        Datos_trabajo: modelo.Datos_trabajo,
        Tiempo_trab_actual: modelo.Tiempo_trab_actual,
        Nombre_ref_familiar: modelo.Nombre_ref_familiar,
        Telefono_ref_familiar: modelo.Telefono_ref_familiar,
        Nombre_ref_personal: modelo.Nombre_ref_personal,
        Telefono_ref_personal: modelo.Telefono_ref_personal,
        clienteId: modelo.clienteId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: InfoFinacieraModelo): Observable<InfoFinacieraModelo> {
    return this.http.put<InfoFinacieraModelo>(
      `${this.url}/info-financieras/${modelo.Id_financiera}`,
      {
        Total_ingresos: modelo.Total_ingresos,
        Datos_trabajo: modelo.Datos_trabajo,
        Tiempo_trab_actual: modelo.Tiempo_trab_actual,
        Nombre_ref_familiar: modelo.Nombre_ref_familiar,
        Telefono_ref_familiar: modelo.Telefono_ref_familiar,
        Nombre_ref_personal: modelo.Nombre_ref_personal,
        Telefono_ref_personal: modelo.Telefono_ref_personal,
        clienteId: modelo.clienteId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<InfoFinacieraModelo> {
    return this.http.delete<InfoFinacieraModelo>(
      `${this.url}/info-financieras/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

}
