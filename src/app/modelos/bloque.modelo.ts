import { ProyectoModelo } from "./proyecto.modelo";

export class BloqueModelo{
    Id_bloque?: number;
    Nombre?: String;
    Descripcion?: string;
    proyectoId?: number;
    proyecto: ProyectoModelo = new ProyectoModelo();  
}