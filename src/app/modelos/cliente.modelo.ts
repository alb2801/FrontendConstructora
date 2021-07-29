import { CiudadModelo } from "./ciudad.modelo";
import { InfoFinacieraModelo } from "./info-finaciera.modelo";
import { SolicitudModelo } from "./solicitud.modelo";

export class ClienteModelo{
    Id_cliente?: number;
    Documento?: number;
    Nombre?: String;
    Apellido?: String;
    Fecha_nacimiento?: String;
    Fotografia?: object;
    Celular?: number;
    Correo_electronico?: String;
    Direccion?: String;
    Contrasena?: String;
    ciudadId?: number;
    ciudadCliente: CiudadModelo = new CiudadModelo();
    solicitudId?: number;
    solicitudCliente: SolicitudModelo = new SolicitudModelo();
    infoFinancieraId?: number;
    infoFinancieraCliente: InfoFinacieraModelo = new InfoFinacieraModelo();
    
}