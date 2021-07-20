import { PaisModelo } from "./pais.modelo";

export class CiudadModelo{
    Id_ciudad?: number;
    Nombre?: String;
    pais?: number;
    paisCiudad: PaisModelo = new PaisModelo();  
}