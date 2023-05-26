import { Category } from "./Category.model";

export interface Apunte{
    idApunte?:number,
    id_categoria:number,
    titulo:string;
    contenido:string,
    categoria?:Category,
    archivo_usuario?:any,
    id_usuario:number,
}                                                                       