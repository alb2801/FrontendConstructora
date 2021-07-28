import { ProyectoModelo } from "./proyecto.modelo";

export class BloqueModelo{
    Id_bloque?: number;
    Nombre?: String;
    Descripcion?: string;
    proyecto?: number;
    proyectoBloque: ProyectoModelo = new ProyectoModelo();  
}