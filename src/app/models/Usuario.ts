import { Factura } from "./Factura";

export interface Usuario
{
    id:number;
    nombre: string;
    apellido: string; 
    edad: number;
    correo_electronico: string; 
    tipo_usuario: number; 
    Facturas:Factura[];
}

export interface IDelete{
    id:Number;
    user:string;
}