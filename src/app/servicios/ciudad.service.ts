import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<CiudadModelo[]>{
    return this.http.get<CiudadModelo[]>(`${this.url}/ciudades`);
  }

  BuscarRegistros(Id: number): Observable<CiudadModelo>{
    return this.http.get<CiudadModelo>(`${this.url}/ciudades/${Id}`);
  }

  AlmacenarRegistro(modelo: CiudadModelo): Observable<CiudadModelo> {
    return this.http.post<CiudadModelo>(
      `${this.url}/ciudades`,
      {
        Nombre: modelo.Nombre,
        pais: modelo.pais
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: CiudadModelo): Observable<CiudadModelo> {
    return this.http.put<CiudadModelo>(
      `${this.url}/ciudades/${modelo.Id_ciudad}`,
      {
        Nombre: modelo.Nombre,
        pais: modelo.pais
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(Id: number): Observable<CiudadModelo> {
    console.log(Id)
    return this.http.delete<CiudadModelo>(
      `${this.url}/ciudades/${Id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
