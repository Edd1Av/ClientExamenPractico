import { Usuario } from "./Usuario";

export interface Factura{
    id:number;
    id_usuario:number;
    folio:string;
    saldo:number;
    fecha_facturacion:Date;
    fecha_creacion:Date;
    usuario:Usuario;
}

