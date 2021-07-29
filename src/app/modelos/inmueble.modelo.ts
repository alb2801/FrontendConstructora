import { BloqueModelo } from "./bloque.modelo";

export class InmuebleModelo{
    Id_inmueble?: number;
    Identificador?: String;
    Valor?: number;
    bloqueId?: number;
    bloque: BloqueModelo = new BloqueModelo();  
}