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
    return this.http.get<InfoFinacieraModelo[]>(`${this.url}/info-financieras/?filter={"include":["ciudadCliente"]}`);
  }

  BuscarRegistros(Id_financiera: number): Observable<InfoFinacieraModelo>{
    return this.http.get<InfoFinacieraModelo>(`${this.url}/info-financieras/${Id_financiera}`);
  }

  AlmacenarRegistro(modelo: InfoFinacieraModelo): Observable<InfoFinacieraModelo> {
    return this.http.post<InfoFinacieraModelo>(
      `${this.url}/info-financieras`,
      {
        total: modelo.Total_ingresos,
        datos: modelo.Datos_trabajo,
        tiempo: modelo.Tiempo_trab_actual,
        refFami: modelo.Nombre_ref_familiar,
        telFami: modelo.Telefono_ref_familiar,
        refPer: modelo.Nombre_ref_personal,
        telPer: modelo.Telefono_ref_personal,
        clienteId: modelo.clienteId,
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
        total: modelo.Total_ingresos,
        datos: modelo.Datos_trabajo,
        tiempo: modelo.Tiempo_trab_actual,
        refFami: modelo.Nombre_ref_familiar,
        telFami: modelo.Telefono_ref_familiar,
        refPer: modelo.Nombre_ref_personal,
        telPer: modelo.Telefono_ref_personal,
        clienteId: modelo.clienteId,
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
