import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    Id_usuario?: String;
    Documento?: number;
    Nombre?: String;
    Apellido?: String;
    Correo?: String;
    Celular?: number;
    Ciudad?: String;
    Contrasena?: String;
    Rol?: String;
    user?: UsuarioModule;
    tk?: String;
}