import { CiudadModelo } from "./ciudad.modelo";

export class ProyectoModelo{
    Id_proyecto?: number;
    Nombre?: String;
    Descripcion?: String;
    Imagen?: object;
    ciudadProyecto: CiudadModelo = new CiudadModelo;
}