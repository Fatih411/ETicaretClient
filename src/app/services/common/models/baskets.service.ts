import { Injectable } from '@angular/core';
import { ControllerType, HttpClientService } from '../http-client.service';
import { List_Basket_Item } from 'src/app/contracts/Basket/List_Basket_Item';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Basket_Item } from 'src/app/contracts/Basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/Basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketsService {

  constructor(private httpClientService:HttpClientService) { }
  async get():Promise<List_Basket_Item[]>{
    const observable : Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller:ControllerType.Basket
    });
    return await firstValueFrom(observable);
  }
  async add(basketItem:Create_Basket_Item){
   const observable:Observable<any> = this.httpClientService.post({
      controller:ControllerType.Basket
    },basketItem)
   return await firstValueFrom(observable);
  }
  async updateQuantity(basketItem:Update_Basket_Item):Promise<Update_Basket_Item>{
   const observable:Observable<Update_Basket_Item> = this.httpClientService.put({
    controller:ControllerType.Basket
   },basketItem);
   return await firstValueFrom(observable);
  }
  async remove(basketItemId:string):Promise<any>{
    const observable : Observable<any> = this.httpClientService.delete({
      controller:ControllerType.Basket
    },basketItemId)
    return await firstValueFrom(observable);
  }
  
}
