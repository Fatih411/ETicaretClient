import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/Basket/List_Basket_Item';
import { Update_Basket_Item } from 'src/app/contracts/Basket/update_basket_item';
import { BasketsService } from 'src/app/services/common/models/baskets.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private basketService:BasketsService){
    super(spinner);
  }
  basketItems:List_Basket_Item[];
  async ngOnInit(){
    this.showSpinner(SpinnerType.Ball_Atom)
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.Ball_Atom)
  }
  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.Ball_Atom)
    const basketItemId = object.target.attributes["id"].value;
    const quantity:number=object.target.value;
    const basketItem:Update_Basket_Item=new Update_Basket_Item();
    basketItem.basketItemId=basketItemId;
    basketItem.quantity=quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.Ball_Atom)
  }
  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.Ball_Atom);
   
    await this.basketService.remove(basketItemId);
    $("."+basketItemId).fadeOut(500,()=>this.hideSpinner(SpinnerType.Ball_Atom));
    
  }
  
}
