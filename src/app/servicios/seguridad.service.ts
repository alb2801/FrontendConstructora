import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelo';
import { DatosGenerales } from '../config/datos.generales';
import { ResetPassModelo } from '../modelos/resetear-contraseña.modelo';
import { cambiarClaveModelo } from '../modelos/cambiar-contraseña.modelo';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = DatosGenerales.url;
  datosDeSesion: BehaviorSubject<UsuarioModelo> = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo());

  constructor(private http: HttpClient) {
    this.VerificarSesion();
  }

  VerificarSesion() {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let datosEnObjeto: UsuarioModelo = JSON.parse(datos);
      datosEnObjeto.isLoggedIn = true;
      this.RefrescarDatosSesion(datosEnObjeto);
    }
  }

  VerificarUsuario(modelo: UsuarioModelo): Observable<any> {
    return this.http.post<any>(
      `${this.url}/identificar-usuario`,
      {
        nombre_usuario: modelo.Correo,
        clave: modelo.Contrasena
      },
      {
        headers: new HttpHeaders({

        })
      });
  }

  ResetearContraseña(modelo : ResetPassModelo): Observable<any>{
    return this.http.post<any>(
      `${this.url}/rest-password`,
      
      {
        correo: modelo.Correo
      },
      {
        headers: new HttpHeaders({

        })
      });
  }

  CambiarContraseña(modelo : cambiarClaveModelo): Observable<any>{
    let Id_usuario;
    this.ObtenerDatosSesion().subscribe((datos) => {
      Id_usuario = datos.Id_usuario;
      console.log(Id_usuario)
    }) 
    return this.http.post<cambiarClaveModelo>(
      `${this.url}/cambiar-clave`,
      
      {
        Id_usuario: Id_usuario,
        Contrasena: modelo.Contrasena,
        ContrasenaNueva: modelo.ContrasenaNueva
      },
      {
        headers: new HttpHeaders({
          "Authorization" : `Bearer ${this.ObternerToken()}`
        })
      });
  }
  RefrescarDatosSesion(usuarioModelo: UsuarioModelo) {
    this.datosDeSesion.next(usuarioModelo);
  }

  ObtenerDatosSesion() {
    return this.datosDeSesion.asObservable();
  }

  AlmacenarDatosSesionEnLocal(usuarioModelo: UsuarioModelo): Boolean {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      return false;
    } else {
      let datosString = JSON.stringify(usuarioModelo);
      localStorage.setItem("session-data", datosString);
      usuarioModelo.isLoggedIn = true;
      this.RefrescarDatosSesion(usuarioModelo);
      return true;
    }
  }

  RemoverLocalStorage(){
    let datos = localStorage.removeItem("session-data");
    this.RefrescarDatosSesion(new UsuarioModelo());
  }

  ObternerToken(){
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let obj: UsuarioModelo = JSON.parse(datos);
      console.log(obj.tk)
      return obj.tk;
    } else {
      return "";
    }
  }

  UsuarioId(){
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let obj: UsuarioModelo = JSON.parse(datos);
      return obj.Id_usuario;
    } else {
      return "";
    }
  }

  ValidarSesionPorToken():boolean {
    let datos = localStorage.getItem("session-data");
    if (datos) {
      let obj: UsuarioModelo = JSON.parse(datos);
      // invocar al backend 
      return true;
    } else {
      return false;
    }
  }

}
