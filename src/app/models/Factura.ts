import { Usuario } from "./Usuario";

export interface Factura{
    id:number;
    id_Usuario:number;
    folio:string;
    saldo:number;
    fecha_Facturacion:Date;
    fecha_Creacion:Date;
    usuario:Usuario;
}

