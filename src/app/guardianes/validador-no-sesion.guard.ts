import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorNoSesionGuard implements CanActivate {
  constructor(private servicio: SeguridadService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return !this.servicio.ValidarSesionPorToken();
  }
  
}
