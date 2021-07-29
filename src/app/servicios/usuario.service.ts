import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    });
  }

  BuscarRegistros(Id_usuario: number): Observable<UsuarioModelo>{
    return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${Id_usuario}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    });
  }

  AlmacenarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(
      `${this.url}/usuarios`,
      {
        Documento: modelo.Documento,
        Nombre: modelo.Nombre,
        Apellido: modelo.Apellido,
        Correo: modelo.Correo,
        Celular: modelo.Celular,
        Ciudad: modelo.Ciudad,
        Rol: modelo.Rol
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.put<UsuarioModelo>(
      `${this.url}/usuarios/${modelo.Id_usuario}`,
      {
        Documento: modelo.Documento,
        Nombre: modelo.Nombre,
        Apellido: modelo.Apellido,
        Correo: modelo.Correo,
        Celular: modelo.Celular,
        Ciudad: modelo.Ciudad,
        Contrasena: modelo.Contrasena,
        Rol: modelo.Rol
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: String): Observable<UsuarioModelo> {
    return this.http.delete<UsuarioModelo>(
      `${this.url}/usuarios/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
