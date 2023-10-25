import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';

declare var $:any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertifyService:AlertifyService,private dialogServices:DialogService){
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updateDate','photo','delete','edit',];
  dataSource : MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getProducts(){
    this.showSpinner(SpinnerType.Ball_Atom);
    const allProduct :{totalCount:number,products: List_Product[]} = await this.productService.read(
      this.paginator?this.paginator.pageIndex:0,
      this.paginator?this.paginator.pageSize:5,
      ()=>this.hideSpinner(SpinnerType.Ball_Atom),
      errorMessage=>this.alertifyService.message(errorMessage,
      {
        dismissOthers:true,
        messageType:MessageType.Error,
        position:PositionType.Top_Right
      }
    ));
    this.dataSource = new MatTableDataSource<List_Product>(allProduct.products);
    this.paginator.length=allProduct.totalCount;
    
  }
  addProductImages(id:string){
    this.dialogServices.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:1400
      }
    })
  }
   pageChanged(){
     this.getProducts();
  }
 
   ngOnInit() {
    this.getProducts();
  }
}
