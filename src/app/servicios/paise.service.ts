import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { PaisModelo } from '../modelos/pais.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaiseService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<PaisModelo[]>{
    return this.http.get<PaisModelo[]>(
      `${this.url}/paises`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  BuscarRegistros(Id_pais: number): Observable<PaisModelo>{
    return this.http.get<PaisModelo>(
      `${this.url}/paises/${Id_pais}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  AlmacenarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.post<PaisModelo>(
      `${this.url}/paises`,
      {
        Nombre: modelo.Nombre,
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.put<PaisModelo>(
      `${this.url}/paises/${modelo.Id_pais}`,
      {
        Nombre: modelo.Nombre,
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<PaisModelo> {
    return this.http.delete<PaisModelo>(
      `${this.url}/paises/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
