import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { ImagenProyectoModelo } from '../modelos/imagen.proyecto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObternerToken();
  }

  ListarRegistros(): Observable<ClienteModelo[]>{
    return this.http.get<ClienteModelo[]>(`${this.url}/clientes/?filter={"include":["ciudad","solicitud","infoFinanciera"]}`);
  }

  BuscarRegistros(Id_cliente: number): Observable<ClienteModelo>{
    return this.http.get<ClienteModelo>(`${this.url}/clientes/${Id_cliente}`);
  }

  AlmacenarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.post<ClienteModelo>(
      `${this.url}/clientes`,
      {
        Documento: modelo.Documento,
        Nombre: modelo.Nombre,
        Apellido: modelo.Apellido,
        Fecha_nacimiento: modelo.Fecha_nacimiento,
        Fotografia: modelo.Fotografia,
        Celular: modelo.Celular,
        Correo_electronico: modelo.Correo_electronico,
        Direccion: modelo.Direccion,
        Contrasena: modelo.Contrasena,
        ciudadId: modelo.ciudadId,
        solicitudId: modelo.solicitudId,
        infoFinancieraId: modelo.infoFinancieraId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.put<ClienteModelo>(
      `${this.url}/clientes/${modelo.Id_cliente}`,
      {
        Documento: modelo.Documento,
        Nombre: modelo.Nombre,
        Apellido: modelo.Apellido,
        Fecha_nacimiento: modelo.Fecha_nacimiento,
        Fotografia: modelo.Fotografia,
        Celular: modelo.Celular,
        Correo_electronico: modelo.Correo_electronico,
        Direccion: modelo.Direccion,
        Contrasena: modelo.Contrasena,
        ciudadId: modelo.ciudadId,
        solicitudId: modelo.solicitudId,
        infoFinancieraId: modelo.infoFinancieraId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<ClienteModelo> {
    return this.http.delete<ClienteModelo>(
      `${this.url}/clientes/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  CargarArchivo(formData: FormData): Observable<ImagenProyectoModelo> {
    return this.http.post<ImagenProyectoModelo>(
      `${this.url}/CargarImagenProyecto`,
      formData,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }
}
