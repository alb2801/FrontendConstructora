import { CiudadModelo } from "./ciudad.modelo";

export class ProyectoModelo{
    Id_proyecto?: number;
    Nombre?: String;
    Descripcion?: String;
    Imagen?: String;
    ciudad?: number;
    ciudadProyecto: CiudadModelo = new CiudadModelo;
}