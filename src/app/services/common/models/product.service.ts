import { Injectable } from '@angular/core';

import { Create_Product } from 'src/app/contracts/create_product';
import { ControllerType, HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Images } from 'src/app/contracts/list_product_images';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClientService) {}

  async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCollBack?:(errorMessage:string)=>void ):Promise<{totalCount:number;products:List_Product[]}>{
    const promiseData : Promise<{totalCount:number;products:List_Product[]}> = this.httpClient.get<{totalCount:number;products:List_Product[]}>(
      {
        controller:ControllerType.Products,
        queryString:`page=${page}&size=${size}`
      })
      .toPromise();
      promiseData.then(d => successCallBack())
      .catch((errorResponse:HttpErrorResponse) => errorCollBack(errorResponse.message));
      return await promiseData;
  } 
  create(product:Create_Product,successCallBack?:any,errorCollBack?: (errorMessage:string)=>void){
    this.httpClient.post({controller:ControllerType.Products},product)
    .subscribe(
      {
        next:result=>{
          successCallBack();
        },       
        error:(errorResponse:HttpErrorResponse)=>{
          const _error : Array<{key: string; value: Array<string>}> = errorResponse.error;
          let message=``;
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCollBack(message);
        },
        complete:()=>console.log("complete çalıştı")
      }
    )
  }

 async delete(id:string){
    const deleteObservable:Observable<any>= this.httpClient.delete<any>({
      controller:ControllerType.Products
    },id);
    await firstValueFrom(deleteObservable);
  }

 async readImages(id:string, successCallBack?:()=>void) : Promise<List_Product_Images[]>{
   const getObservable:Observable<List_Product_Images[]> = this.httpClient.get<List_Product_Images[ ]>(
      {
        action:"GetProductImages",
        controller:ControllerType.Products,

      },id);
      successCallBack();
      const image = await firstValueFrom(getObservable);
      
      return image;
  }
  async deleteImage(imageId:string,id:string, successCallBack?:()=>void){
    const deleteObservable = this.httpClient.delete({
      action:"DeleteProductImage",
      controller:ControllerType.Products,
      queryString:`imageId=${imageId}`
    },id);
    successCallBack();
    await firstValueFrom(deleteObservable);
  }
  
  async changeShowcaseImage(imageId:string,productId:string, successCallBack?:()=>void):Promise<void>{
    const changeShowcaseImageObservable = this.httpClient.get({
      controller:ControllerType.Products,
      action : "ChangeShowcaseImage",
      queryString:`imageId=${imageId}&productId=${productId}`,
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
