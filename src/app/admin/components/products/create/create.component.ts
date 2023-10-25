import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { ControllerType } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(spinner : NgxSpinnerService,private productServices:ProductService,private alertify:AlertifyService){
    super(spinner);
  }
 
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  create(name :HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    const create_product : Create_Product = new Create_Product();
    create_product.name=name.value;
    create_product.stock=parseInt(stock.value);
    create_product.price=parseFloat(price.value);
    this.productServices.create(create_product,()=>
    {
      this.hideSpinner(SpinnerType.Ball_Atom);
      this.alertify.message("Ürün başarıyla eklenmiştir",
      {
        dismissOthers:true,messageType:MessageType.Success,
        position:PositionType.Bottom_Right});
        this.createdProduct.emit(create_product);
    },errorMessage=>{
      this.alertify.message(`${errorMessage}`,
      {
        dismissOthers:true,
        messageType:MessageType.Error,
        position:PositionType.Top_Right
      });
    });

    
  }
}
