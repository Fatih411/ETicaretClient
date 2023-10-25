import { List_Product_Images } from "./list_product_images";

export class List_Product{
    id:string;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updateDate:Date;
    productImagesFiles?:List_Product_Images[];
    imagePath?:string;
}