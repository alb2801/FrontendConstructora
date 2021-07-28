import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<BloqueModelo[]>{
    return this.http.get<BloqueModelo[]>(`${this.url}/bloques/?filter={"include":["proyectoBloque"]}`);
  }

  BuscarRegistros(Id: number): Observable<BloqueModelo>{
    return this.http.get<BloqueModelo>(`${this.url}/bloques/${Id}`);
  }

  BuscarRegistrosPorPais(paisId: number): Observable<BloqueModelo[]> {
    return this.http.get<BloqueModelo[]>(`${this.url}/pais/${paisId}/ciudads`);
  }

  AlmacenarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    return this.http.post<BloqueModelo>(
      `${this.url}/bloques`,
      {
        Nombre: modelo.Nombre,
        pais: modelo.Descripcion
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    return this.http.put<BloqueModelo>(
      `${this.url}/bloques/${modelo.Id_bloque}`,
      {
        Nombre: modelo.Nombre,
        pais: modelo.Descripcion
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(Id: number): Observable<BloqueModelo> {
    console.log(Id)
    return this.http.delete<BloqueModelo>(
      `${this.url}/bloques/${Id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}