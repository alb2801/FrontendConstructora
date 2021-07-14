import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) {}

  VerificarUsuario(modelo: UsuarioModelo): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/identificar-usuario`,
      {
        nombre_usuario: modelo.Correo,
        clave: modelo.Contrasena
      },
      {
        headers: new HttpHeaders({

        })
      });
  }

}
