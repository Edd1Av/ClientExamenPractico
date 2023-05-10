import { Factura } from "./Factura";

export interface Usuario
{
    id:number;
    nombre: string;
    apellido: string; 
    edad: number;
    correo_Electronico: string; 
    tipo_Usuario: number; 
    Facturas:Factura[];
}

export interface IDelete{
    id:Number;
    user:string;
}