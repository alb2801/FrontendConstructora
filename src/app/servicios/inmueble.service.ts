import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<InmuebleModelo[]>{
    return this.http.get<InmuebleModelo[]>(
      `${this.url}/inmuebles/?filter={"include":["bloque"]}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  BuscarRegistros(Id: number): Observable<InmuebleModelo>{
    return this.http.get<InmuebleModelo>(
      `${this.url}/inmuebles/${Id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  BuscarRegistrosPorPais(paisId: number): Observable<InmuebleModelo[]> {
    return this.http.get<InmuebleModelo[]>(`${this.url}/pais/${paisId}/ciudads`);
  }

  AlmacenarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    return this.http.post<InmuebleModelo>(
      `${this.url}/inmuebles`,
      {
        Identificador: modelo.Identificador,
        Valor: modelo.Valor,
        bloqueId: modelo.bloqueId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo> {
    return this.http.put<InmuebleModelo>(
      `${this.url}/inmuebles/${modelo.
      Id_inmueble}`,
      {
        Identificador: modelo.Identificador,
        Valor: modelo.Valor,
        bloqueId: modelo.bloqueId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(Id: number): Observable<InmuebleModelo> {
    console.log(Id)
    return this.http.delete<InmuebleModelo>(
      `${this.url}/inmuebles/${Id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}