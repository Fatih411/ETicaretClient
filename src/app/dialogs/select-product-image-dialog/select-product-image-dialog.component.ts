import { Component,Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { ControllerType } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Images } from 'src/app/contracts/list_product_images';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { async } from '@angular/core/testing';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialog:DialogService
    )
  {
    super(dialogRef);
  }

  
  ngOnInit():void{
   this.getImages();
  }

  @Output() options:Partial<FileUploadOptions>={
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:ControllerType.Products,
    explanation:'Ürün resmini seçin veya buraya sürükleyin...',
    isAdminPage:true,
    queryString:`ProductsId=${this.data}`
  }

  images:List_Product_Images[];

  async getImages(){
    this.spinner.show(SpinnerType.Ball_Atom)
     this.images = await this.productService.readImages(this.data as string,()=>this.spinner.hide(SpinnerType.Ball_Atom));
  }
  async deleteImage(imageId:string, event:any){
    this.dialog.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async ()=> {
        this.spinner.show(SpinnerType.Ball_Atom);
        await this.productService.deleteImage(imageId,this.data as string,()=>{
          this.spinner.hide(SpinnerType.Ball_Atom);
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }
  showCase(imageId:string){
    this.spinner.show(SpinnerType.Ball_Atom)
    this.productService.changeShowcaseImage(imageId,this.data as string,()=>{
      this.spinner.hide(SpinnerType.Ball_Atom);
    })
  }
}
export enum SelectProductImageState{
  Close
}

