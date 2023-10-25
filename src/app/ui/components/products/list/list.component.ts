import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Basket_Item } from 'src/app/contracts/Basket/create_basket_item';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Images } from 'src/app/contracts/list_product_images';
import { BasketsService } from 'src/app/services/common/models/baskets.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService,private actiavtedRoute:ActivatedRoute,private fileServices:FileService,private basketService:BasketsService,spinner:NgxSpinnerService,private toastr:CustomToastrService) {
   super(spinner);
  }
  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  pageSize:number=12;
  pageList:number[]=[];
  baseUrl:BaseUrl;
  products : List_Product[];

  async ngOnInit() {

      this.baseUrl = await this.fileServices.getBaseStorageUrl();

      this.actiavtedRoute.params.subscribe(async params => {
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);
  
      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {
  
        },
        errorMessage => {
  
        });
  
      this.products=data.products;
  
     
        this.products= this.products.map<List_Product>(p => {
 
          const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImagesFiles.length ? p.productImagesFiles.find(p=>p.showcase)?.path : "assets/noimage.jpg",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImagesFiles: p.productImagesFiles
        };        
        return listProduct;
      });
        this.totalProductCount = data.totalCount;
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
  
        this.pageList = []; 

      if(this.currentPageNo-3<=0)
        for(let i=1;i<=7;i++)
          this.pageList.push(i);
      
      else if(this.currentPageNo + 3 >=this.totalPageCount)
        for(let i =this.totalPageCount-6;i<=this.totalPageCount;i++)
          this.pageList.push(i);
      
      else
        for(let i =this.currentPageNo-3;i<=this.currentPageNo+3;i++)
        this.pageList.push(i);
    });
   
  }
  
  async addToBasket(product:List_Product){
    this.showSpinner(SpinnerType.Ball_Atom);
    let _basketItem:Create_Basket_Item=new Create_Basket_Item();
    _basketItem.productId=product.id;
    _basketItem.quantity=1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Ball_Atom);
    this.toastr.message("Sepete ekleme işlemi başarılı","Başarılı",{
      meesageType:ToastrMessageType.Success,
      position:ToastrPositionType.Top_Right
    })
  }

}
