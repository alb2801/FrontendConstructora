import { ClienteModelo } from "./cliente.modelo";

export class InfoFinacieraModelo{
    Id_financiera?: number;
    Total_ingresos?: number;
    Datos_trabajo?: String;
    Tiempo_trab_actual?: String;
    Nombre_ref_familiar?: String;
    Telefono_ref_familiar?: number;
    Nombre_ref_personal?: String;
    Telefono_ref_personal?: number;
    clienteId?: number;
    infoFinaCliente: ClienteModelo = new ClienteModelo;
}