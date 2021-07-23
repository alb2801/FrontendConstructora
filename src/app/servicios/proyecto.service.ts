import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ProyectoModelo } from '../modelos/proyecto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<ProyectoModelo[]>{
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyectos/?filter={"include":["ciudadProyecto"]}`);
  }

  BuscarRegistros(Id: number): Observable<ProyectoModelo>{
    return this.http.get<ProyectoModelo>(`${this.url}/proyectos/${Id}`);
  }

  AlmacenarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    let ciudadId = 0;
    if(modelo.ciudad){
      ciudadId = parseInt(modelo.ciudad.toString());
    }
    return this.http.post<ProyectoModelo>(
      `${this.url}/proyectos`,
      {
        Nombre: modelo.Nombre,
        ciudad: ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    let ciudadId = 0;
    if(modelo.ciudad){
      ciudadId = parseInt(modelo.ciudad.toString());
    }
    return this.http.put<ProyectoModelo>(
      `${this.url}/proyectos/${modelo.Id_proyecto}`,
      {
        Nombre: modelo.Nombre,
        ciudad: ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(Id: number): Observable<ProyectoModelo> {
    console.log(Id)
    return this.http.delete<ProyectoModelo>(
      `${this.url}/proyectos/${Id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}

