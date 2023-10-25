import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ControllerType, HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
  constructor(spinner: NgxSpinnerService,private httpClient:HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
  
  }
  @ViewChild(ListComponent) listComponents : ListComponent;

  createdProduct(createProduct:Create_Product){
    this.listComponents.getProducts();
  }
}
