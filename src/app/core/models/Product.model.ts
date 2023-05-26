import { Category } from './Category.model'
import { ImageProduct } from './ImageProduct.model'

export interface Product{
    idProduct?:number,
    name: string,
    price: number,
    amount: number,
    description: string,
    image?: string,
    idUsuario: number,
    categories?: Category[],
    imageProduct?: ImageProduct                     
}                                                                                